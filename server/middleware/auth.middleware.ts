
import { NextFunction, Request, Response } from "express";
import { extractPayload } from "../utils/jwt.utils";
import { prisma } from "../config/db.config";
import { serverErrorResponse } from "../utils/response.utils";

// Middleware for authentication and authorization
export const authMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {


    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is provided in the Authorization header
    if (!token) {
        return res.status(401).json({
            message: "No token found"
        })
    }

    try {
        // Decode JWT token to extract user information
        const decoded = extractPayload(token);

        // If decoding fails or no user information found, return unauthorized
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        // Fetch student profile based on decoded user ID
        const studentProfile = await prisma.student.findUnique({
            where: {
                id: decoded.id
            }
        })

        // If student profile not found, user is not authorized to access resource
        if (!studentProfile) {
            return res.status(401).json({
                message: "Student not authorized to access resource"
            })
        }

        // If all checks pass, proceed to the next middleware or route handler
        next();

    } catch (err) {
        // Return server error response if an error occurs during authentication or authorization
        return serverErrorResponse(err, res)
    }
}
