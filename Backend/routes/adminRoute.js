import express from "express"
import { addHackathon, deleteHackathon, updateHackathon, adminUpdate, showAdminData } from "../controller/adminController.js"
import upload from "../middleware/multerMiddleware.js"
import checkAdmin from "../middleware/authCheckMiddleware.js"
const router = express.Router()

router.post("/addHackathon", upload.single("image"), checkAdmin, addHackathon)
router.delete("/:hackathonId/deleteHackathon", checkAdmin, deleteHackathon)
router.put("/:hackathonId/updateHackathon", upload.single("image"), checkAdmin, updateHackathon)
router.put("/updateAdminPanel", upload.single("image"), checkAdmin, adminUpdate)
// router.get("/:adminId/hackathons", checkAdmin, showHackathon)
router.get("/adminData", checkAdmin, showAdminData)

export default router


