import { NextFunction, Request, Response } from "express";
import { extractPayload } from "../utils/jwt.utils";
import { prisma } from "../config/db.config";
import { serverErrorResponse } from "../utils/response.utils";

export const authMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
 

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token found"
        })
    }
    try {
        const decoded = extractPayload(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const studentProfile = await prisma.student.findUnique({
            where: {
                id: decoded.id
            }
        })
        if (!studentProfile) {
            return res.status(401).json({
                message: "Student not authorized to access resource"
            })
        }
        next()



    }
    catch (err) {
        return serverErrorResponse(err, res)

    }
}