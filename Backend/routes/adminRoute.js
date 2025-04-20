import express from "express"
import { addHackathon,deleteHackathon,updateHackathon,adminUpdate,showHackathon } from "../controller/adminController.js"
import upload from "../middleware/multerMiddleware.js"
const router = express.Router()

router.post("/addHackathon/:id",upload.single("image"),addHackathon)
router.delete("/:adminId/deleteHackathon/:hackathonId",deleteHackathon)
router.put("/:adminId/updateHackathon/:hackathonId",upload.single("image"),updateHackathon)
router.put("/:adminId/updateAdminPanel",upload.single("image"),adminUpdate)
router.get("/:adminId/hackathons",showHackathon)
export default router