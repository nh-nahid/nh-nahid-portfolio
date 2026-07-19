import { Router } from "express";
import { login, logout, getMe, refreshToken, changePassword, forgotPassword, resetPassword, } from "../controllers/adminController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
const router = Router();
// =========================
// PUBLIC ROUTES
// =========================
// Admin login
router.post("/login", login);
// Refresh access token
router.post("/refresh-token", refreshToken);
// Forgot password
router.post("/forgot-password", forgotPassword);
// Reset password
router.post("/reset-password", resetPassword);
// =========================
// PROTECTED ROUTES
// =========================
// Logout
router.post("/logout", checkLogin, logout);
// Current admin profile
router.get("/me", checkLogin, getMe);
// Change password
router.patch("/change-password", checkLogin, changePassword);
export default router;
