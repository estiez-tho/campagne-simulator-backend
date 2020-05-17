import dotenv from "dotenv";
dotenv.config();

export const JwtSecret = process.env.JWT_KEY;
