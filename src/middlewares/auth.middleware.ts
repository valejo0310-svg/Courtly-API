import { Request, Response, NextFunction } from "express";
import jwt,{ JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
    userId: number;
    role: string;
}

export async function authMiddleware (req: Request, res: Response, next : NextFunction):Promise <void>{
    const authorization = req.headers.authorization

    if(!authorization){
        res.status(401).json({
            message : ('Token is required')
        })
        return;
    }
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        res.status(401).json({ message: "Invalid token format" });
        return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    try {
        const payload = jwt.verify(
            token,
            secret
        ) as AuthTokenPayload;
    
        req.user = {
            userId: payload.userId,
            role: payload.role
        };

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}