import express from "express"
import { addHackathon } from "../controller/adminController.js"
import upload from "../middleware/multerMiddleware.js"
const router = express.Router()

router.post("/addHackathon/:id",upload.single("image"),addHackathon)

export default router