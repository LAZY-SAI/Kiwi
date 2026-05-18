import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in .env file');
}

export const generateToken = (userId:string, role:string) => {
   //@ts-ignore
    return jwt.sign(
        { userId, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
};

export const verifyToken = (token:string) => {
    try {
        return jwt.verify(token, JWT_SECRET);  // No need for "as string" here either
    } catch (e) {
        return null;
    }
};