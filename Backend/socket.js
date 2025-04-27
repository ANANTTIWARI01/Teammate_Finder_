const users = {};
const friendRequests = {};

export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        users[socket.id] = socket.id; 

        socket.on("send_friend_request", ({ senderId, receiverId }) => {
            if (!friendRequests[receiverId]) friendRequests[receiverId] = [];
            friendRequests[receiverId].push(senderId);
            io.to(receiverId).emit("friend_request_received", { senderId });
        });

        socket.on("respond_to_friend_request", ({ senderId, receiverId, accepted }) => {
            if (accepted) {
                io.to(senderId).emit("friend_request_accepted", { receiverId });
                io.to(receiverId).emit("friend_request_accepted", { senderId });

            } else {
                io.to(senderId).emit("friend_request_declined", { receiverId });
            }
        });

        socket.on("send_message", ({ message, recipientId }) => {
            if (friends[socket.id]?.includes(recipientId)) {
                io.to(recipientId).emit("receive_message", { message, senderId: socket.id });
            } else {
                socket.emit("error_message", "You are not connected to this user.");
            }
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
            delete users[socket.id]; 
        });

        io.emit("update_users", users);
    });
}