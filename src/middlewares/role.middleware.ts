import { Request, Response, NextFunction } from "express";


export function roleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction):void =>{

    if (!req.user){
        res.status(401).json({
            message : ('This feature is not allowed')
        })
        return;
    }
    const hasPermission = allowedRoles.includes(req.user.role)

    if (!hasPermission) {
       
       res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
       return;
    }
    next();
    
}}

