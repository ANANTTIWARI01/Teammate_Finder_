// import { Server } from "socket.io";
// import friendRequest from "./models/friendRequestModel.js";
// import user from "./models/userModel.js";
// import "dotenv/config";

// const userSockets = {}; // Store users and their socket IDs

// const initializeSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: process.env.FRONTEND_URI,
//             methods: ["GET", "POST"],
//         },
//     });

//     io.on("connection", (socket) => {
//         console.log(`User connected: ${socket.id}`);

//         // Store user's socket ID
//         socket.on("registerUser", (userId) => {
//             userSockets[userId] = socket.id;
//             console.log(`User ${userId} registered with socket ID: ${socket.id}`);
//         });

//         // Handle sending a friend request
//         socket.on("sendRequest", async ({ senderId, receiverId, message }) => {
//             try {
//                 const sender = await user.findById(senderId);
//                 const receiver = await user.findById(receiverId);
//                 if (!sender || !receiver) {
//                     return socket.emit("error", { message: "Sender or receiver not found" });
//                 }

//                 // Check if a request already exists to prevent duplicates
//                 const existingRequest = await friendRequest.findOne({ sender: senderId, receiver: receiverId, status: "pending" });
//                 if (existingRequest) {
//                     return socket.emit("error", { message: "Friend request already sent!" });
//                 }

//                 // Create new request
//                 const newRequest = new friendRequest({
//                     sender: senderId,
//                     receiver: receiverId,
//                     message,
//                     status: "pending",
//                 });

//                 await newRequest.save();

//                 // ✅ Send request ID back to the sender for tracking
//                 socket.emit("requestSent", { requestId: newRequest._id, receiverId });

//                 // ✅ Notify recipient if online
//                 if (userSockets[receiverId]) {
//                     io.to(userSockets[receiverId]).emit("newRequest", { sender: senderId, requestId: newRequest._id });
//                 }

//             } catch (error) {
//                 console.error("Error sending request:", error.message);
//                 socket.emit("error", { message: "Internal server error" });
//             }
//         });

//         // Handle accepting or rejecting friend request
//         socket.on("friend_request_respond", async ({ requestId, status }) => {
//             try {
//                 if (!["accepted", "rejected"].includes(status)) {
//                     return socket.emit("error", { message: "Invalid response status" });
//                 }

//                 const request = await friendRequest.findById(requestId);
//                 if (!request) {
//                     return socket.emit("error", { message: "Friend request not found" });
//                 }

//                 // Update request status
//                 request.status = status;
//                 await request.save();

//                 // ✅ Notify sender about the response
//                 if (userSockets[request.sender.toString()]) {
//                     io.to(userSockets[request.sender.toString()]).emit("requestResponse", { requestId, status });
//                 }

//                 socket.emit("responseSuccess", { message: `Request ${status} successfully!`, request });

//             } catch (error) {
//                 console.error("Error responding to friend request:", error.message);
//                 socket.emit("error", { message: "Internal server error" });
//             }
//         });

//         // Handle user disconnect
//         socket.on("disconnect", () => {
//             console.log(`User disconnected: ${socket.id}`);
//             Object.keys(userSockets).forEach((userId) => {
//                 if (userSockets[userId] === socket.id) {
//                     delete userSockets[userId];
//                 }
//             });
//         });
//     });

//     return io;
// };

// export default initializeSocket;