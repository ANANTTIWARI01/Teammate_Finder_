import user from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import admin from "../models/adminModel.js"
import "dotenv/config"

export async function adminRegister(req, res) {
    try {
        const { name, email, password } = req.body

        const existingAdmin = await admin.findOne({ email })
        if (existingAdmin) return res.status(400).json({ message: "Admin Already Existed" });

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = new admin({
            name,
            email,
            password: hashedPassword,

        });

        await newAdmin.save()
        return res.status(200).json({ message: "Admin Succesfully Created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in Registering" });

    }

}


export async function adminLogin(req, res) {
    try {
        const { email, password } = req.body

        const Admin = await admin.findOne({ email })

        if (!Admin) return res.status(401).json({ message: "Invalid Credentials" });

        const isPasswordValid = await bcrypt.compare(password, Admin.password)
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

        const adminToken = jwt.sign(
            {
                id: Admin._id,
                email: Admin.email
            }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )


        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        }).send({
            message: "Admin Logged in Successfully",
            admin: {
                id: Admin._id,
                email: Admin.email
            }
        })

    } catch (error) {
        console.log("Login Error", error)
        return res.status(500).json({ message: "Server Error", error: error.message })

    }
}


export async function logoutAdmin(req, res) {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.status(200).send({ message: "Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }
}


export async function logoutUser(req, res) {
    try {
        const userId = req.user

        res.clearCookie("userToken")
        await user.findByIdAndUpdate(userId, { isLoggedIn: false })
        res.status(200).send({ message: "Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }
}


export async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body

        const existingUser = await user.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User Already Registered" })

        const hashedPassword = await bcrypt.hash(password, 10)


        const newUser = new user({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in Registering" })

    }
}


export async function userLogin(req, res) {
    try {
        const { email, password } = req.body

        const User = await user.findOne({ email })

        if (!User) return res.status(401).json({ message: "Invalid Credentials" });

        const isPasswordValid = await bcrypt.compare(password, User.password)

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

        await user.findByIdAndUpdate(User._id, { isLoggedIn: true })
        const userToken = jwt.sign(
            {
                id: User._id,
                email: User.email
            }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )



        res.cookie("userToken", userToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        }).send({
            message: "User Logged in Successfully",
            user: {
                id: User._id,
                email: User.email
            }
        })


    } catch (error) {
        console.log("Login Error", error)
        return res.status(500).json({ message: "Server Error", error: error.message })

    }
}
