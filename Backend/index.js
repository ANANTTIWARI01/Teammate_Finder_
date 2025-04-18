import express from "express"
import authRouter from "./routes/authRoute.js"
import "dotenv/config"
import cors from "cors"
import { connectDB } from "./connection/db.js"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use("/api/auth", authRouter)


connectDB()
app.listen(PORT, () => console.log(`server is running on ${PORT}`)
)