import express from "express"
 import {fetchAllHackathons} from "../controller/userController.js"
const router= express.Router()

router.get("/hackathons",fetchAllHackathons)

export default router;

