import { Router } from "express";
import { getHome, updateHomeStats } from "../controllers/homeController.js";
import { checkLogin } from "../middlewares/checkLogin.js";
const router = Router();
// Public homepage data
router.get("/", getHome);
// Update stats (protected)
router.patch("/", checkLogin, updateHomeStats);
export default router;
