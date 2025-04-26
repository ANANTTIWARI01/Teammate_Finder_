import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import admin from "../models/adminModel.js";

export async function addHackathon(req, res) {
    try {
        const id = req.admin;
        const file = req.file;
        // const { anantId}  = req.user
console.log(id);

        // checking file type
        if (!file || !file.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Invalid file type. Please upload an image." });
        }

        // getting the data of the hacakathon
        const { name, description, mode, date,registrationLink,hackathonLink } = req.body;

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
            registrationLink,
            hackathonLink
        };
console.log(Admin);

        // saving the hackathon data into the admin
        Admin.Hackathon.push(newHackathon);
        await Admin.save();

        res.status(200).json({ message: "Hackathon added successfully", });
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
        const adminId = req.admin
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
        const adminId = req.admin

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
        console.log(req.body);
        
        const adminId = req.admin
        const { name, email, organizationName, locationName, description, latitude, longitude } = req.body

        const adminUpdate = await admin.findById(adminId)

        if (!adminUpdate) return res.status(404).json({ message: "Admin not found" })

        if (req.file) {
                const secure_url = await uploadToCloudinary(req).catch((err) => {
                    throw new Error("Cloudinary upload failed");
                });
                adminUpdate.image = secure_url
        }
        if (name) adminUpdate.name = name;
        if (email) adminUpdate.email = email;
        if (description) adminUpdate.description = description;
        if (organizationName) adminUpdate.organizationName = organizationName;
        if (locationName) adminUpdate.locationName = locationName;
        if (latitude) adminUpdate.locationCoordinates.latitude = latitude
        if (longitude) adminUpdate.locationCoordinates.longitude = longitude


        await adminUpdate.save()

        return res.status(200).json({ message: "Admin Updated Successfully" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
}

// export async function showHackathon(req, res) {
//     try {
//         // const adminId = req.params.adminId
//         const adminId  = req.admin;

//         const fetchHackathon = await admin.findById(adminId)
//         if (!fetchHackathon) return res.status(404).json({ message: "Admin Not Found" })

//         const hackathons = fetchHackathon.Hackathon
//         res.status(200).json({ message: "Hackathon Showing Successfully", hackathons })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" })

//     }
// }

export async function showAdminData(req, res) {
    try {
        const adminId = req.admin

        const adminData = await admin.findById(adminId)
        if (!adminData) return res.status(404).json({ message: "Admin Not Found" })
        res.status(200).json({ message: "Admin Data Showing Successfully", adminData })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}