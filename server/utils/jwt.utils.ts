import { config } from "dotenv";
const jwt = require("jsonwebtoken");


// Load environment variables from .env file
config();

// Function to generate JWT token with payload
export const generateToken = (payload: any) => {
    /* 
    Generates a JWT token with the provided payload.
    
    Parameters:
    - payload: Object containing data to be encoded in the token
    
    Returns:
    - string: JWT token
    
    */
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
}

// Function to extract payload from JWT token
export const extractPayload = (token: string) => {
    /* 
    Extracts and verifies the payload from a JWT token.
    
    Parameters:
    - token: JWT token string
    
    Returns:
    - any: Decoded payload object if token is valid, otherwise throws an error
    
    */
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
