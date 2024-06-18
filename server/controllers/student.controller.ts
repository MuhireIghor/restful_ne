import { Request, Response } from "express";
import { prisma } from "../config/db.config";
import { hashSync } from "bcrypt";
import { badRequestResponse, createSuccessResponse, serverErrorResponse } from "../utils/response.utils";

export const registerStudent = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password){
        return badRequestResponse("Please provide all fields", res)

    }
    try {
        const hashedPassword = hashSync(password, 10);
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })
        return createSuccessResponse("Student created Successfully", student, res)
    }
    catch (err) {
        return serverErrorResponse(err, res)
    }

}
