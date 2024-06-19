import express from 'express';
import { getAllBooks, getAllBooksPaginated, getBookById, registerBook } from '../controllers/book.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBookRegistration } from '../validations/book.validation';
// Route for registering a new book
const bookRoute = express.Router();
bookRoute.post('/register', validateBookRegistration,registerBook
    // #swagger.summary = 'Register new book'
    );
// Route for retrieving all books
bookRoute.get("/all",authMiddleware, getAllBooks
    // #swagger.summary = 'Retrieve all books'
    );

// Route for retrieving a book by its ID
bookRoute.get("/book-by-id/:id", getBookById
    // #swagger.summary = 'Retrieve book by id'

);
bookRoute.get("/get-all-paginated",getAllBooksPaginated)
export default bookRoute;