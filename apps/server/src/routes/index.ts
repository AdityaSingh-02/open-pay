import express from "express";
import { router as userRouter } from "./users"
import { router as transferFundsRouter } from "./transfer";
import { authMiddleWare } from "../middleware";

const router = express.Router()
router.use("/users", userRouter);
// @ts-ignore
router.use("/funds", authMiddleWare, transferFundsRouter);

export default router;