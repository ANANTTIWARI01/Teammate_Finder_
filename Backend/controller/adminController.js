import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import admin from "../models/adminModel.js";
export async function addHackathon(req, res) {
    try {
        const id = req.params.id;
        const file = req.file;

        if (!file || !file.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Invalid file type. Please upload an image." });
        }

        const { name, description, mode, date } = req.body;

        if (!name || !description || !mode || !date) {
            return res.status(400).json({ message: "Missing required fields: name, description, mode, or date" });
        }

        const secure_url = await uploadToCloudinary(req).catch((err) => {
            throw new Error("Cloudinary upload failed");
        });

        const Admin = await admin.findById(id);
        if (!Admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const newHackathon = {
            name,
            description,
            mode,
            date,
            image: secure_url,
        };

        Admin.Hackathon.push(newHackathon);
        await Admin.save();

        res.status(200).json({ message: "Hackathon added successfully" });
    } catch (error) {
        console.error(error.stack); 
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


