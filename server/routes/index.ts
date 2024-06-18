import express from "express"
import authRoute from "./auth.route";
import bookRoute from "./book.route";
import studentRoute from "./student.route";
const route = express.Router();
route.use("/auth", authRoute
    /*
#swagger.tags = ['Auth']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */)
route.use("/books", bookRoute
    /*
#swagger.tags = ['Book']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */)
route.use("/student", studentRoute
    /*
#swagger.tags = ['Student']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */);
export default route;