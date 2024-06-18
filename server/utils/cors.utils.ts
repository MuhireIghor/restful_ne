import { NextFunction, Request, Response } from "express";
/**
 * 
 * @param req this is the request object
 * @param res  this is the response object
 * @param next this is the next callback function
 */
export function corsFunction(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = ['http://10.5.221.135:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin!) >= 0) {
        res.setHeader('Access-Control-Allow-Origin', origin!);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
}