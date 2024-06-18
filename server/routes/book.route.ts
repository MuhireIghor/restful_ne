import express from 'express';
import { getAllBooks, getBookById, registerBook } from '../controllers/book.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const bookRoute = express.Router();
bookRoute.post('/register', registerBook
    // #swagger.summary = 'Register new book'
    );
bookRoute.get("/all",authMiddleware, getAllBooks
    // #swagger.summary = 'Retrieve all books'
    );
bookRoute.get("/book-by-id/:id", getBookById
    // #swagger.summary = 'Retrieve book by id'

);
export default bookRoute;