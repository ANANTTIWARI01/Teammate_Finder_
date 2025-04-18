import mongoose, { Schema } from "mongoose"


const hackathonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ["offline", "online"],
        required: true
    },
    Description: {
        type: String,
    },
    Date: {
        type: Date,
        required: true
    },
    registrationLink: {
        type: String,
        required: true
    },
    hackathonLink: {
        type: String
    },
    image: {
        type: String,
    },

}, { timestamps: true })


const adminSchema = new Schema({
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
    organizationName: {
        type: String,
        // required: true
    },
    locationName: {
        type: String,
        // required: true
    },
    locationCoordinates: {
        latitude: { type: String, 
            // required: true
         },
        longitude: { type: String,
            //  required: true
             }
    },
    image: {
        type: String,
    },
    Hackathon: [hackathonSchema]

}, { timestamps: true })

const admin = mongoose.model("admin", adminSchema)
export default admin;