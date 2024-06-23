import express from "express";
import {router as userRouter} from "./users"

const router = express.Router()
router.use("/users", userRouter);

export default router;