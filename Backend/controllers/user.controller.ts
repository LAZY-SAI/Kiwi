import { Request, Response } from 'express';
import { UserPool } from '../database/database.js';
import bcrypt from "bcrypt";
import {generateRefreshToken, generateToken} from "../utils/auth.js";

//  GET USER DETAILS
export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const result = await UserPool.query(
            "SELECT user_id, name, email, location, role FROM users WHERE user_id = $1",
            // @ts-ignore
            [req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }

        return res.json({user:result.rows[0]});
    } catch (e: any) {
        console.error("Error fetching user:", e);
        return res.status(500).json({
            message: "Failed to fetch user details",
            error: e.message
        });
    }
};

//  SIGNUP
export const signupUser = async (req: Request, res: Response) => {
    const { name, email, location, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await UserPool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        // Insert new user
        const response = await UserPool.query(
            "INSERT INTO users(name, password, email, location) VALUES($1, $2, $3, $4) RETURNING *",
            [name, hashPassword, email, location]
        );

        return res.status(201).json({
            message: "Signed up successfully",
            user: response.rows[0]
        });
    } catch (e: any) {
        console.error("Error during signup:", e);
        return res.status(500).json({
            message: "Signup failed",
            error: e.message
        });
    }
};

//  LOGIN (AUTH)
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const result = await UserPool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];
        console.log(user)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        console.log("Generating token with role:", user.role);
        const token = generateToken(user.user_id, user.role);

        // Send cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            message: "successfully logged in",
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                location: user.location,
                role: user.role
            }
        });
    } catch (e: any) {
        console.error("Error during login:", e);
        return res.status(500).json({
            message: "Login failed",
            error: e.message
        });
    }
};

//logout
export const logoutUser =async(req:Request, res:Response) =>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:0
    })

    res.status(200).json({message:"logged out successfully"})
};

