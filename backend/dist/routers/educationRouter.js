import { Router } from "express";
import { getEducations, createEducation, updateEducation, deleteEducation, } from "../controllers/educationController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
const router = Router();
// Public routes
router.get("/", getEducations);
// Protected CRUD routes
router.post("/", checkLogin, createEducation);
router.patch("/:id", checkLogin, updateEducation);
router.delete("/:id", checkLogin, deleteEducation);
export default router;
