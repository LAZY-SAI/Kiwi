import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = process.env.JWT_EXPIRY as string|| "2h";
const JWT_REFRESH = process.env.JWT_REFRESH as string;

if (!JWT_SECRET) throw new Error('JWT_SECRET must be defined in .env file');
if (!JWT_REFRESH) throw new Error('JWT_REFRESH must be defined in .env file');

export const generateToken = (userId: string, role: string) => {
    //@ts-ignore
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const generateRefreshToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, JWT_REFRESH, { expiresIn: '3d' });
};

export const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return { payload, error: null };
    } catch (e: any) {
        return { payload: null, error: e.message };
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_REFRESH);
        return { payload, error: null };
    } catch (e: any) {
        return { payload: null, error: e.message };
    }
};






