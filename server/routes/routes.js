import express from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";
import commentRouter from "./commentRouter.js";
import uploadRouter from "./uploadRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/video", uploadRouter);

export default router;
