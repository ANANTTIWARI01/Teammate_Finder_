import express from "express"
import { adminRegister,adminLogin,userLogin,userRegister,logoutAdmin} from "../controller/authController.js"
import { checkAdmin } from "../middleware/authCheckMiddleware.js"
const router = express.Router()

router.post("/admin/register",adminRegister)
router.post("/admin/login",adminLogin)
router.post("/admin/logout", logoutAdmin);
router.get("/checkAdmin", checkAdmin,(req,res)=>res.send({message:"Access Granted"}))
router.post("/user/login",userLogin)
router.post("/user/register",userRegister)




export default router;