import { config } from "dotenv";
const jwt = require("jsonwebtoken")
config()
export const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
}

export const extractPayload = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}