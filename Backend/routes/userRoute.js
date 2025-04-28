import express from "express"
 import {fetchAllHackathons,findNearByUser,userUpdate} from "../controller/userController.js"
 import checkUser from "../middleware/UserCheckMiddleware.js"
import upload from "../middleware/multerMiddleware.js"
 
const router= express.Router()

router.get("/hackathons",checkUser,fetchAllHackathons)
// router.post("/update-login-status", updateLoginStatus);
router.get("/nearby-users",checkUser,findNearByUser)
router.put("/userPanelUpdate",checkUser, upload.single("image"),userUpdate)
export default router;

