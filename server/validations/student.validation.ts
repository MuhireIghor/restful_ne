import Joi from "joi";
import { errorResponse } from "../utils/response.utils";
//implemented new student validation middleware
export async function validateStudentRegistration(req, res, next) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required(),
      });
  
      const { error } = schema.validate(req.body);
      if (error) return errorResponse(error.details[0].message, res);
  
      return next();
    } catch (ex:any) {
      return errorResponse(ex.message, res);
    }
  }
  //implemented login validation middleware
  export async function validateLogin(req, res, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
      });
  
      const { error } = schema.validate(req.body);
      if (error) return errorResponse(error.details[0].message, res);
  
      return next();
    } catch (ex:any) {
      return errorResponse(ex.message, res);
    }
  }