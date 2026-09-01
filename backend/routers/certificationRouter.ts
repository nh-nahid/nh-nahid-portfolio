import { Router } from "express";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
import { certificationCoverUpload } from "../middlewares/certification/certificationCoverUpload.js";

const router = Router();

// Public routes
router.get("/", getCertifications);

// Protected CRUD routes
router.post("/", checkLogin, certificationCoverUpload, createCertification);
router.patch("/:id", checkLogin, certificationCoverUpload, updateCertification);
router.delete("/:id", checkLogin, deleteCertification);

export default router;
