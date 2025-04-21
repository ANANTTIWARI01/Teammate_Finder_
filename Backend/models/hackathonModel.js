import mongoose, { Schema } from "mongoose"


const hackathon = mongoose.model("hackathon", hackathonSchema)
export default hackathon;