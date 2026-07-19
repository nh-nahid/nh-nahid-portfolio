import { Router } from "express";
import { checkLogin } from "../middlewares/checkLogin.js";
import { projectImageUpload } from "../middlewares/project/projectImageUpload.js";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController.js";
const router = Router();
// =========================
// PUBLIC ROUTES
// =========================
// Get all projects
router.get("/", getProjects);
// Get single project by slug
router.get("/:slug", getProjects);
// =========================
// PROTECTED ROUTES
// =========================
// Create project
router.post("/", checkLogin, projectImageUpload, createProject);
// Update project
router.patch("/:id", checkLogin, projectImageUpload, updateProject);
// Delete project
router.delete("/:id", checkLogin, deleteProject);
export default router;
