import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"
async function uploadToCloudinary(req) {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    try {
        
        const uploadResult = await cloudinary.uploader
            .upload(req.file.path, {
                folder: "Teammate-Finder"
            })
        return uploadResult.secure_url
    }
    catch (error) {
        console.log(error);
    };

};

export default uploadToCloudinary;