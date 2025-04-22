import express from "express"
 import {fetchAllHackathons,updateLoginStatus} from "../controller/userController.js"
 import checkUser from "../middleware/UserCheckMiddleware.js"
 
const router= express.Router()

router.get("/hackathons",checkUser,fetchAllHackathons)
router.post("/update-login-status", updateLoginStatus);

export default router;

