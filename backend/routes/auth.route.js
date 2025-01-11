import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
// chuc nang dang nhap 
router.post("/login", login);
router.post("/logout", logout);
router.post("/timkiem", logout);

export default router;