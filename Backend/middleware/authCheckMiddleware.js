import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config';
import admin from "../models/adminModel.js";

// const authCheckMiddleware = (tokenKey) => (req, res, next) => {
//     const token = tokenKey === "admin" ? req.cookies.adminToken : req.cookies.userToken
//     console.log(token);

//     if (!token) {
//         console.log("token missing");
//         return res.status(401).json({ message: "No token provided" });
//     }
//     try {
//         // console.log("token received");
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log("Decoded user:", decoded);
//         req.user = decoded;
//         // console.log(req.user.id);

//         next();
//     } catch (error) {
//         return res.status(402).json({ message: "Invalid or expired token" });
//     }
// }
// export default authCheckMiddleware;

export function checkAdmin(req, res, next) {
console.log(req.cookies);

    const token = req.cookies.adminToken;

    if (!token) return res.status(401).send({ message: "No Token Found" });
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded.id;
        // console.log(req.admin);

        next();
    }
    catch (error) {
        return res.status(402).json({ message: "Invalid or expired token" });
    }
}

export default checkAdmin;