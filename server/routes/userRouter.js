import express from "express";
import {
  followUser,
  getAllUsers,
  getUserDetail,
  unFollowUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.put("/update/:id", verifyToken, updateUser);
router.post("/follow/:id", verifyToken, followUser);
router.post("/unfollow/:id", verifyToken, unFollowUser);
router.get("/:id", verifyToken, getUserDetail);

export default router;
