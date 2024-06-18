import express from "express"
import { authController } from "../controllers/auth.controller";
import { validateLogin } from "../validations/student.validation";
const authRoute = express.Router();
authRoute.post("/login", validateLogin,authController
    // #swagger.summary = 'Auth Controller'
    );
export default authRoute;