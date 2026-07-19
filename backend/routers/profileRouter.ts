import { Router } from "express";

import {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar,
  updateResume,
  deleteResume,
} from "../controllers/profileController.js";

import { checkLogin } from "../middlewares/checkLogin.js";

import { avatarUpload } from "../middlewares/profile/avatarUpload.js";
import { resumeUpload } from "../middlewares/profile/resumeUpload.js";

const router = Router();

// =========================
// PUBLIC ROUTES
// =========================

// Get portfolio profile
router.get(
  "/",
  getProfile
);

// =========================
// PROTECTED ROUTES
// =========================

// Update profile information
router.patch(
  "/",
  checkLogin,
  updateProfile
);

// Upload avatar
router.patch(
  "/avatar",
  checkLogin,
  avatarUpload,
  updateAvatar
);

// Delete avatar
router.delete(
  "/avatar",
  checkLogin,
  deleteAvatar
);

// Upload resume
router.patch(
  "/resume",
  checkLogin,
  resumeUpload,
  updateResume
);

// Delete resume
router.delete(
  "/resume",
  checkLogin,
  deleteResume
);

export default router;