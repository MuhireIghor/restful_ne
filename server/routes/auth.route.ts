import express from "express";
import { authController } from "../controllers/auth.controller";
import { validateLogin } from "../validations/student.validation";

const authRoute = express.Router();

// Route for handling student authentication (login)
authRoute.post("/login", validateLogin, authController);

export default authRoute;