import express from "express";
import upload from "../middlewares/cloudinary.js";
import { uploadVideo } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload-single", upload.single("video"), uploadVideo);

export default router;
