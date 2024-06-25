import express from "express";
import { router as userRouter } from "./users"
import { router as transferFundsRouter } from "./transfer";

const router = express.Router()
router.use("/users", userRouter);
router.use("/funds", transferFundsRouter);

export default router;