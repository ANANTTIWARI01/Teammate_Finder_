import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";

async function uploadToCloudinary(req) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    try {

        let uploadResult  = await cloudinary.uploader.upload(req.file.path, {
                folder: "Teammate-Finder"
            });
                return uploadResult.secure_url
        

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload media to Cloudinary");
    }
};

export default uploadToCloudinary;