import { Request, Response } from "express";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "../utils/response.utils";
import { prisma } from "../config/db.config";
import { compareSync } from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

// Controller for handling user authentication
export const authController = async (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
 required: true,
 content: {
     "application/json": {
         schema: {
             $ref: "#/components/schemas/LoginDto"
         }  
     }
 }
} 
*/

    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return badRequestResponse("Please provide email and password", res)
    }

    try {
        // Find student by email in the database
        const student = await prisma.student.findUnique({
            where: {
                email: email
            }
        })

        // If student not found, return not found response
        if (!student) {
            return notFoundResponse("email", email, "Student", res)
        }

        // Compare passwords to verify if they match
        const isPasswordValid = compareSync(password, student.password);
        if (!isPasswordValid) {
            return unauthorizedResponse(`Invalid credentials check your email or password`, res)
        }

        // Generate JWT token for authentication
        const token = generateToken({
            id: student.id,
            email: student.email
        })

        // Return success response with student data and token
        return successResponse("Student successfully logged in", { student, token }, res)

    } catch (err: any) {
        // Return unauthorized response with error message
        return unauthorizedResponse(`Invalid credentials check your email or password ${err.message}`, res)
    }
}

// Controller for validating JWT token
export const validateToken = (req: Request, res: Response) => {


    try {
        // Extract token from Authorization header or query parameters
        const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : req.query.token;

        // If token is not provided, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({
                message: "No token found"
            })
        }

        // Verify JWT token with the secret key
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // If token is invalid, return 401 Unauthorized
                return res.status(401).json({ message: 'Invalid token' });
            }
            // If token is valid, return 200 OK with user information
            return res.status(200).json({ message: 'Token is valid', user: decoded });
        })

    } catch (err) {
        // Handle unexpected errors (though this section currently does not have explicit error handling)
        return serverErrorResponse(err,res);
    }
}
