import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import admin from "../models/adminModel.js";

export async function addHackathon(req,res){
try {
    const id = req.params.id;
    const file = req.file;
console.log(file);

    if (!file) return res.status(400).send({ message: "Image file is required" });

    const { name, description, mode, date } = req.body;

    if (!name || !description || !mode || !date) {
        return res.status(400).json({ message: "Missing required fields: name, description, mode, or date" });
    }

    const secure_url = await uploadToCloudinary(req);

    const Admin = await admin.findById(id);
    if (!Admin) return res.status(404).json({ message: "Admin not found" });

    const newHackathon = {
        name,
        description,
        mode,
        date,
        image: secure_url,
    };


    Admin.Hackathon.push(newHackathon);
    await Admin.save();

    res.status(200).json({ message: "Hackathon added successfully", hackathon: newHackathon });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
}
}


