import { Router } from "express";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import { checkLogin } from "../middlewares/checkLogin.js";

const router = Router();

// Public routes
router.get("/", getCertifications);

// Protected CRUD routes
router.post("/", checkLogin, createCertification);
router.patch("/:id", checkLogin, updateCertification);
router.delete("/:id", checkLogin, deleteCertification);

export default router;
