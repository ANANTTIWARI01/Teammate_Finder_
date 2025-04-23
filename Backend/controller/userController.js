import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import admin from "../models/adminModel.js"
// import user from "../models/userModel.js";
import user from "../models/userModel.js"
import { getDistance } from "../utils/DistanceCalculator.js";



export async function fetchAllHackathons(req, res) {
  const userId = req.user
  try {

    const admins = await admin.find({}, "Hackathon").lean();

    const hackathons = admins.flatMap(admin => admin.Hackathon);
    const myUser = await user.findById(userId)
    res.status(200).json({
      message: "Hackathons fetched successfully",
      hackathons: hackathons,
      myUser
    });
  } catch (error) {
    console.error("Error fetching hackathons:", error.message);
    res.status(500).json({
      message: "Server Error while fetching hackathons",
      error: error.message
    });
  }
}

export const updateLoginStatus = async (req, res) => {
  const { isLoggedIn } = req.body;
  const id = req.user
  try {
    const User = await user.findByIdAndUpdate(id, { isLoggedIn }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `user ${isLoggedIn ? "logged in" : "logged out"}`, User });
  } catch (error) {
    console.error("Error updating login status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export async function findNearByUser(req, res) {

  const userId = req.user
  const myUser = await user.findById(userId)

  const latitude = myUser.locationCoordinates.latitude
  const longitude = myUser.locationCoordinates.longitude
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Location data required" });
  }

  try {
    let arr = [];
    const users = await user.find({}); // Get all users

    const nearbyUsers = users.filter(user => {
      const distance = getDistance(latitude, longitude, user.locationCoordinates.latitude, user.locationCoordinates.longitude);

      return distance <= 50 && user._id.toString() !== userId.toString();
    });


    res.json({ users: nearbyUsers });
  } catch (error) {
    console.error("Error fetching nearby users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export async function userUpdate(req, res) {
  try {
    const userId = req.user
    const { name, email, skills, address, mode, projects, pastAttendedHackathons, latitude, longitude } = req.body

    const userUpdate = await user.findById(userId)


    if (!userUpdate) return res.status(404).json({ message: "User Not Found" });

    if (req.file) {
      const secure_url = await uploadToCloudinary(req).catch((err) => {
        throw new Error("Cloudinary upload failed");
      });
      userUpdate.image = secure_url
    }

    if (name) userUpdate.name = name;
    if (email) userUpdate.email = email;
    if (skills) userUpdate.skills = [...(userUpdate.skills || []), ...skills.split(" ")];
    if (projects) userUpdate.projects = [...(userUpdate.projects || []), ...projects.split(" ")];
    if (address) userUpdate.address = address;
    if (latitude) userUpdate.locationCoordinates.latitude = latitude
    if (longitude) userUpdate.locationCoordinates.longitude = longitude
    if (pastAttendedHackathons) userUpdate.pastAttendedHackathons = [...(userUpdate.pastAttendedHackathons || []), ...pastAttendedHackathons.split(" ")]
    if (mode) userUpdate.mode = mode

    await userUpdate.save();

    return res.status(200).json({ message: "User Updated Successfully" })

  } catch (error) {
    console.log(error, error.message);
    return res.status(500).send({ error: "Server error", });
  }
}
