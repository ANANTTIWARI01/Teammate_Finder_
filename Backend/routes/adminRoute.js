import express from "express"
import { addHackathon, deleteHackathon, updateHackathon, adminUpdate, showHackathon, showAdminData } from "../controller/adminController.js"
import upload from "../middleware/multerMiddleware.js"
import checkAdmin from "../middleware/authCheckMiddleware.js"
const router = express.Router()

router.post("/addHackathon", upload.single("image"), checkAdmin, addHackathon)
router.delete("/:adminId/deleteHackathon/:hackathonId", checkAdmin, deleteHackathon)
router.put("/:adminId/updateHackathon/:hackathonId", upload.single("image"), checkAdmin, updateHackathon)
router.put("/:adminId/updateAdminPanel", upload.single("image"), checkAdmin, adminUpdate)
router.get("/:adminId/hackathons", checkAdmin, showHackathon)
router.get("/:adminId", checkAdmin, showAdminData)

export default router


