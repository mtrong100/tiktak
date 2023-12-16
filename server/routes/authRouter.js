import express from "express";
import { OAuthLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", OAuthLogin);

export default router;
