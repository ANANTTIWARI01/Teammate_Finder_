import express from "express"
 import {fetchAllHackathons} from "../controller/userController.js"
 import checkUser from "../middleware/UserCheckMiddleware.js"
 
const router= express.Router()

router.get("/hackathons",checkUser,fetchAllHackathons)

export default router;

