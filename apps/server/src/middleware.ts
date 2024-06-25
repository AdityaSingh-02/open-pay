import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import express, { Request, Response, NextFunction } from "express";

export interface IAuthMiddleware extends Request {
    userId: number;
}

export const authMiddleWare = (req: IAuthMiddleware, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json("Invalid Token");
    }

    const token = authHeader.split(' ')[1];
    try {
        if (token) {
            const decode: any = jwt.verify(token, JWT_SECRET);
            req.userId = decode.userId;
            next();
        }
    } catch (error: any) {
        return res.status(403).json({ error: error.message })
    }
}