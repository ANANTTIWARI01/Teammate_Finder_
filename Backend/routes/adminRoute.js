import express from "express"
import { addHackathon,deleteHackathon } from "../controller/adminController.js"
import upload from "../middleware/multerMiddleware.js"
const router = express.Router()

router.post("/addHackathon/:id",upload.single("image"),addHackathon)
router.delete("/:adminId/deleteHackathon/:hackathonId",deleteHackathon)
export default router