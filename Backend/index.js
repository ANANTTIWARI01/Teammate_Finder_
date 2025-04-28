import express from "express";
import authRouter from "./routes/authRoute.js";
import adminRouter from "./routes/adminRoute.js";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./connection/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { setupSocket } from "./socket.js";

const PORT = process.env.PORT;
const app = express();
// const server = createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// const io = new Server(server, { cors: { origin: "*" } });
// setupSocket(io);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));