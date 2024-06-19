import { Request, Response } from "express";
import { prisma } from "../config/db.config";
import { hashSync } from "bcrypt";
import { badRequestResponse, createSuccessResponse, serverErrorResponse } from "../utils/response.utils";

// Controller for registering a new student
export const registerStudent = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
        return badRequestResponse("Please provide all fields", res);
    }

    try {
        // Hash the password before storing in the database
        const hashedPassword = hashSync(password, 10);

        // Create a new student entry in the database
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });

        // Return success response with the newly created student
        return createSuccessResponse("Student created successfully", student, res);

    } catch (err) {
        // Return server error response if an error occurs
        return serverErrorResponse(err, res);
    }
}
