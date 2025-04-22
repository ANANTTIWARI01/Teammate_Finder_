import admin from "../models/adminModel.js"
import user from "../models/userModel.js"



export async function fetchAllHackathons(req, res) {
    try {
        const admins = await admin.find({}, "Hackathon").lean();

        const hackathons = admins.flatMap(admin => admin.Hackathon);

        res.status(200).json({
            message: "Hackathons fetched successfully",
            hackathons: hackathons
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
    const {  isLoggedIn } = req.body;
  const id  = req.user
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
  