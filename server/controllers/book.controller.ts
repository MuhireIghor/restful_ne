import { Request, Response } from "express";
import { prisma } from "../config/db.config";
import { createSuccessResponse, notFoundResponse, serverErrorResponse, successResponse } from "../utils/response.utils";
import { paginator } from "../utils/paginator.util";

// Controller for registering a new book
export const registerBook = async (req: Request, res: Response) => {


    const { name, author, publisher, publicationYear, subject } = req.body;

    // Check if all required fields are provided
    if (!name || !author || !publisher || !publicationYear || !subject) {
        return res.status(400).json({
            message: "Please provide all fields"
        })
    }

    try {
        // Create a new book entry in the database
        const book = await prisma.book.create({
            data: {
                name,
                author,
                publisher,
                publicationYear,
                subject
            }
        });

        // Return success response with the newly created book
        return createSuccessResponse("Book added successfully", book, res);

    } catch (err) {
        // Return server error response if an error occurs
        return serverErrorResponse(err, res);
    }
}

// Controller for fetching all books
export const getAllBooks = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Books']
    #swagger.description = 'Endpoint to fetch all registered books.'
    */

    try {
        // Retrieve all books from the database
        const books = await prisma.book.findMany();

        // Return success response with the list of books
        return createSuccessResponse("Books fetched successfully", books, res);

    } catch (err) {
        // Return server error response if an error occurs
        return serverErrorResponse(err, res);
    }
}

// Controller for fetching a book by its ID
export const getBookById = async (req: Request, res: Response) => {


    const { id } = req.params;

    try {
        // Find a book by its ID in the database
        const book = await prisma.book.findUnique({
            where: {
                id
            }
        });

        // If book is not found, return not found response
        if (!book) {
            return notFoundResponse("Id", id, "book", res);
        }

        // Return success response with the fetched book
        return createSuccessResponse("Book fetched successfully", book, res);

    } catch (err) {
        // Return server error response if an error occurs
        return serverErrorResponse(err, res);
    }
}


//Controller for bringing paginated books

export const getAllBooksPaginated = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const books = await prisma.book.findMany({
            skip: page ? parseInt(page as string) - 1 : 0,
            take: limit ? parseInt(limit as string) : 10,

        })
        const total = await prisma.book.count({});
        return successResponse("Books fetched successfully", { books, meta: paginator({ page: page ? Number(page) : 1, limit: limit ? Number(limit) : 10, total }) }, res)


    }
    catch (err) {
        return serverErrorResponse(err, res)

    }
}