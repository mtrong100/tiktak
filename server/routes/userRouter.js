import express from "express";
import {
  followUser,
  getAllUsers,
  getUserDetail,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.put("/update/:id", verifyToken, updateUser);
router.post("/follow/:id", verifyToken, followUser);
router.get("/:id", verifyToken, getUserDetail);

export default router;
