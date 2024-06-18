import { Request, Response } from "express";
import { prisma } from "../config/db.config";
import { createSuccessResponse, notFoundResponse, serverErrorResponse } from "../utils/response.utils";

export const registerBook = async (req: Request, res: Response) => {
    const { name, author, publisher, publicationYear, subject } = req.body;
    if (!name || !author || !publisher || !publicationYear || !subject) {
        return res.status(400).json({
            message: "Please provide all fields"
        })
    }

    try {
        const book = await prisma.book.create({
            data: {
                name,
                author,
                publisher,
                publicationYear,
                subject

            }
        })
        return createSuccessResponse("Book added successfully", book, res)

    }
    catch (err) {
        return serverErrorResponse(err, res)

    }
}
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany();
        return createSuccessResponse("Books registered successsfully", books, res)

    }
    catch (err) {
        return serverErrorResponse(err, res)
    }
}
export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: {
                id
            }
        })
        if (!book) {
            return notFoundResponse("Id", id, "laptop", res);

        }
        return createSuccessResponse("Books fetched successfully", book, res)


    }
    catch (err) {
        return serverErrorResponse(err, res)
    }
}