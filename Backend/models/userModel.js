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
    mode: {
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
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    locationCoordinates: {
        latitude: {
            type: String,
            // required: true
        },
        longitude: {
            type: String,
            //  required: true
        }
    },
    status: {
        type: String,
        enum: ["available", "not available", "soon"]
    },
    userHackathons: {
        upcoming: {
            type: [String]
        },
        ongoing: {
            type: [String]
        },
        past: {
            type: [String]
        }
    },
    video: {
        type: String
    },

}, { timestamps: true })


const user = mongoose.model("user", userSchema)
export default user;