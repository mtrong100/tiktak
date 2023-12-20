import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/post/:id", getAllComments);
router.post("/create", verifyToken, createComment);
router.put("/update/:id", verifyToken, updateComment);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;
