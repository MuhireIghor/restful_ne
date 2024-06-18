import { Request, Response } from "express";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "../utils/response.utils";
import { prisma } from "../config/db.config";
import { compareSync } from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import jwt from "jsonwebtoken";


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
    if (!email || !password) {
        return badRequestResponse("Please provide email and password", res)
    }
    try {
        const student = await prisma.student.findUnique({
            where: {
                email: email
            },

        })
        if (!student) {
            return notFoundResponse("email", email, "Student", res)
        }
        const isPasswordValid = compareSync(password, student.password);
        if (!isPasswordValid) {
            return unauthorizedResponse(`Invalid credentials check your email or password`, res)
        }
        const token = generateToken({
            id: student.id,
            email: student.email
        })
        return successResponse("Student successfully logged in", { student, token }, res)


    }
    catch (err: any) {
        return unauthorizedResponse(`Invalid credentials check your email or password ${err.message}`, res)
    }

}
export const validateToken = (req: Request, res: Response) => {
    try {
        const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : req.query.token;
        if (!token) {
            return res.status(401).json({
                message: "No token found"
            })
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(200).json({ message: 'Token is valid', user: decoded });
        })




    }
    catch (err) {

    }

}