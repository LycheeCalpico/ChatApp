import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

// add middleware to check if user logged in or not;
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
