import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import admin from "../models/adminModel.js";

export async function addHackathon(req, res) {
    try {
        const id = req.params.id;
        const file = req.file;

        // checking file type
        if (!file || !file.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Invalid file type. Please upload an image." });
        }

        // getting the data of the hacakathon
        const { name, description, mode, date } = req.body;

        if (!name || !description || !mode || !date) {
            return res.status(400).json({ message: "Missing required fields: name, description, mode, or date" });
        }

        // getting the Cloudinary url for image
        const secure_url = await uploadToCloudinary(req).catch((err) => {
            throw new Error("Cloudinary upload failed");
        });

        // finding the admin
        const Admin = await admin.findById(id);
        if (!Admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // creating a new hackathon
        const newHackathon = {
            name,
            description,
            mode,
            date,
            image: secure_url,
        };

        // saving the hackathon data into the admin
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

export async function deleteHackathon(req, res) {
    try {
        const adminId = req.params.adminId
        const hackathonId = req.params.hackathonId

        if (!adminId || !hackathonId) return res.status(404).send({ message: "Hackathon ID is required" })

        const adminDocument = await admin.findById(adminId)
        if (!adminDocument) return res.status(404).send({ message: "Admin Document not found" })

        // filtering the hackathons
        adminDocument.Hackathon = adminDocument.Hackathon.filter(obj => obj._id.toString() !== hackathonId)

        //    saving the filtered hackathons
        await adminDocument.save()

        return res.status(200).json({ message: "Hackathon Deleted Successfully", admin: adminDocument })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
}

export async function updateHackathon(req, res) {
    try {
        const adminId = req.params.adminId
        const hackathonId = req.params.hackathonId

        const { name, date, mode, description, registrationLink, hackathonLink } = req.body
        if (!adminId || !hackathonId) return res.status(404).send({ message: "Admin ID and Hackathon ID are required" })

        const adminDocument = await admin.findById(adminId)

        const toUpdateHackathon = adminDocument.Hackathon.find(obj => obj._id.toString() === hackathonId)

        if (!toUpdateHackathon) return res.status(404).send({ message: " Hackathon not found" })

        if (req.file) {
            const secure_url = await uploadToCloudinary(req).catch((err) => {
                throw new Error("Cloudinary upload failed");
            });
            toUpdateHackathon.image = secure_url
        }
        if (name) toUpdateHackathon.name = name
        if (registrationLink) toUpdateHackathon.registrationLink = registrationLink
        if (hackathonLink) toUpdateHackathon.hackathonLink = hackathonLink
        if (date) toUpdateHackathon.date = date
        if (mode) toUpdateHackathon.mode = mode
        if (description) toUpdateHackathon.description = description


        await adminDocument.save()
        return res.status(200).json({ message: "Hackathon Update Successfully", admin: adminDocument })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
}

export async function adminUpdate(req, res) {
    try {
        const adminId = req.params.adminId
        const { name, email, organizationName, locationName,description } = req.body

        const adminUpdate = await admin.findById(adminId)
console.log(adminUpdate);

        if (!adminUpdate) return res.status(404).json({ message: "Admin not found" })

        if (name) adminUpdate.name = name;
        if (email) adminUpdate.email = email;
        if (description) adminUpdate.description = description;
        if (organizationName) adminUpdate.organizationName = organizationName;
        if (locationName) adminUpdate.locationName = locationName;

        await adminUpdate.save()

        return res.status(200).json({ message: "Admin Updated Successfully" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
}