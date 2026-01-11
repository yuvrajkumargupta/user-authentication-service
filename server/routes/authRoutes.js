import express from "express";
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from "../controllers/auth_Controller.js";
import userAuth from "../middleware/userAuth.js"
const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.post("/logout", logout);

// SEND OTP (protected)
router.post("/send-verify-otp", userAuth, sendVerifyOtp);

// VERIFY EMAIL (protected)
router.post("/verify-email", userAuth, verifyEmail);
// check that is auth or not 
router.get("/is-auth", userAuth, isAuthenticated);

// SEND RESET OTP
router.post("/send-reset-otp", sendResetOtp);

// RESET PASSWORD
router.post("/reset-password", resetPassword);





export default router;


