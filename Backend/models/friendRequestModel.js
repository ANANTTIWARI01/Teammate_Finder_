import mongoose, { Schema } from "mongoose";

const friendRequestSchema = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    status: {
        type: String
    }
}, { timestamps: true })


const friendRequest = mongoose.model("friendRequest", friendRequestSchema)
export default friendRequest; 