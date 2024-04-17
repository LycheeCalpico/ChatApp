import express from "express";
import multer from "multer";
import { login, signup, logout } from "../controllers/auth.controller.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/login", login);
router.post("/signup", upload.single("profilePic"), signup);
router.post("/logout", logout);

export default router;
