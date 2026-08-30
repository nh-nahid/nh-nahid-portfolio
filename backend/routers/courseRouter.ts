import { Router } from "express";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
import { courseLogoUpload } from "../middlewares/course/courseLogoUpload.js";

const router = Router();

// Get courses (public)
router.get("/", getCourses);

// Protected CRUD
router.post("/", checkLogin, courseLogoUpload, createCourse);
router.patch("/:id", checkLogin, courseLogoUpload, updateCourse);
router.delete("/:id", checkLogin, deleteCourse);

export default router;
