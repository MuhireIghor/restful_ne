import Joi from "joi";
import { errorResponse } from "../utils/response.utils";
//implemented new Book validation middleware
export async function validateBookRegistration(req, res, next) {
    try {
      const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        author: Joi.string().required().label("Author"),
        publisher: Joi.string().required().label("Publisher"),
        publicationYear: Joi.number().required().label("Publication Year"),
        subject: Joi.string().required().label("Subject"),
        
      });
  
      const { error } = schema.validate(req.body);
      if (error) return errorResponse(error.details[0].message, res);
  
      return next();
    } catch (ex:any) {
      return errorResponse(ex.message, res);
    }
  }
