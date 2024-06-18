import express from 'express';
import { registerStudent } from '../controllers/student.controller';
const studentRoute = express.Router();
studentRoute.post('/register', registerStudent
    // #swagger.summary = 'Register new student'
    );
export default studentRoute;