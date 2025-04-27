import mongoose, { Schema } from "mongoose";

const messageModel = new Schema({
     sender: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
        receiver: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
        content:{
            type:String
        },
        seen:{
            type:Boolean
        }
},{timestamps:true})

const message = mongoose.model("message",messageModel)

export default message;