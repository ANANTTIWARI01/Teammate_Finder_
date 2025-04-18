import express from "express"
import { adminRegister,adminLogin,userLogin,userRegister,logoutAdmin} from "../controller/authController.js"
import authCheckMiddleware from "../middleware/authCheckMiddleware.js"
const router = express.Router()

router.post("/admin/register",adminRegister)
router.post("/admin/login",adminLogin)
router.post("/admin/logout", logoutAdmin);
router.get("/check", authCheckMiddleware("admin"),(req,res)=>res.send({message:"Access Granted"}))
router.post("/user/login",userLogin)
router.post("/user/register",userRegister)




export default router;