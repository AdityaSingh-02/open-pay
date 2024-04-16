import express from "express";
import {router as userRouter} from "./users"

const router = express.Router()
router.use("/v1", userRouter);

export default router;