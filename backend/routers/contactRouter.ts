import { Router } from "express";

import {
  deleteMessage,
  getMessage,
  getMessages,
  markAsRead,
  sendMessage,
} from "../controllers/contactController.js";

import { checkLogin } from "../middlewares/checkLogin.js";

const router = Router();

/* ==========================================
   PUBLIC
========================================== */

// Send contact message
router.post("/", sendMessage);

/* ==========================================
   ADMIN
========================================== */

// Get all messages
router.get("/", checkLogin, getMessages);

// Get single message
router.get("/:id", checkLogin, getMessage);

// Mark as read
router.patch("/:id/read", checkLogin, markAsRead);

// Delete message
router.delete("/:id", checkLogin, deleteMessage);

export default router;