import express from 'express';
import { registerStudent } from '../controllers/student.controller';
import { validateStudentRegistration } from '../validations/student.validation';
const studentRoute = express.Router();
//Route for registering a new student 
studentRoute.post('/register', validateStudentRegistration,registerStudent
    // #swagger.summary = 'Register new student'
    );
export default studentRoute;