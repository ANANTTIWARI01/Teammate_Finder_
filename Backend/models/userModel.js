import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
    },
    address: {
        type: String,
        // required: true
    },
    Hackmode: {
        type: String,
        enum: ["offline", "online"],
        // required: true
    },
    projects: {
        type: [String]
    },
    image: {
        type: String,
    },
    pastAttendedHackathons: {
        type: [String]
    },
    teammates: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    isLoggedIn: { type: Boolean, default: false }

}, { timestamps: true })


const user = mongoose.model("user", userSchema)
export default user;