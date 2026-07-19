import { Router } from "express";
import { getSkills, createSkill, updateSkill, deleteSkill, } from "../controllers/skillController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
const router = Router();
// =========================
// PUBLIC ROUTES
// =========================
// Get all skills
router.get("/", getSkills);
// =========================
// PROTECTED ROUTES
// =========================
// Create skill
router.post("/", checkLogin, createSkill);
// Update skill
router.patch("/:id", checkLogin, updateSkill);
// Delete skill
router.delete("/:id", checkLogin, deleteSkill);
export default router;
