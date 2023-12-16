import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostDetail,
  toggleLikePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.post("/create", verifyToken, createPost);
router.post("/like/:id", verifyToken, toggleLikePost);
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/:id", getPostDetail);

export default router;
