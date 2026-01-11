import express from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";


const app = express();
const PORT = process.env.PORT || 4000;
connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());




app.get("/", (req, res) => {
  res.send(" Server is running successfully second ");
});

app.use('/api/auth', authRouter );

app.use('/api/user',userRouter);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});