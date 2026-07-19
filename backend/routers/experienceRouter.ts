import { Router } from "express";


import { checkLogin } from "../middlewares/checkLogin.js";
import { companyLogoUpload } from "../middlewares/experience/companyLogoUpload.js";
import { createExperience, deleteExperience, getExperiences, updateExperience } from "../controllers/experienceController.js";

const router = Router();

// =========================
// PUBLIC ROUTES
// =========================

// Get all experiences
router.get("/", getExperiences);

// =========================
// PROTECTED ROUTES
// =========================

// Create experience
router.post(
  "/",
  checkLogin,
  companyLogoUpload,
  createExperience
);

// Update experience
router.patch(
  "/:id",
  checkLogin,
  companyLogoUpload,
  updateExperience
);

// Delete experience
router.delete("/:id", checkLogin, deleteExperience);

export default router;