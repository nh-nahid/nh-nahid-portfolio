import { Router } from "express";
import { getHome } from "../controllers/homeController.js";
const router = Router();
// Public homepage data
router.get("/", getHome);
export default router;
