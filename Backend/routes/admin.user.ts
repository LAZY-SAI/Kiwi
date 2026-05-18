import {Router} from "express";
import pool from '../database/database.js';
// @ts-ignore
import bcrypt from "bcrypt";
import {generateToken} from "../utils/auth.js";
import {tokenAuthentication} from "../middleware/TokenAuthentication";

const UserDetails = Router();


UserDetails.get("/api/users",tokenAuthentication ,async(req, res) => {
try{

    const result = await pool.query("SELECT user_id, name, email,location,role FROM users " +
        "WHERE user_id = $1",
        // @ts-ignore
        [req.userId]);

    if(result.rows.length === 0){
        return res.status(404).json({message:"user not found"})
    }
    res.json(result.rows[0])
    console.log(result.rows[0]);

}
catch (e:any){
    console.error("Error during login:", e);
    res.status(500).json({
        message: "Login failed",
        error: e.message
    });
}

})
// Signup endpoint

UserDetails.post("/api/signup", async(req, res) => {
    const {name, email, location, password} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    console.log("data received", req.body);

    try {
        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        // Insert new user
        const response = await pool.query(
            "INSERT INTO users(name, password, email, location) VALUES($1, $2, $3, $4) RETURNING *",
            [name, hashPassword, email, location]
        );

        res.status(201).json({
            message: "Signed up successfully",
            user: response.rows[0]
        });
    } catch (e:any) {
        console.error("Error during signup:", e);
        res.status(500).json({
            message: "Signup failed",
            error: e.message
        });
    }
});

// Login endpoint
// UserDetails.post("/api/auth", async(req, res) => {
//     const {emailOrUsername, password} = req.body;
//
//     try {
//         // Find user by email or username
//         const result = await pool.query(
//             "SELECT * FROM users WHERE email = $1 OR name = $1",
//             [emailOrUsername]
//         );
//
//         if (result.rows.length === 0) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }
//
//         const user = result.rows[0];
//
//         // Check password (plain text for now)
//         if (user.password !== password) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }
//
//         // Return user data
//         res.json({
//             message: "Login successful",
//             user: {
//                 id: user.user_id,
//                 name: user.name,
//                 email: user.email,
//                 location: user.location,
//                 role: user.role
//             }
//         });
//     } catch (e) {
//         console.error("Error during login:", e);
//         res.status(500).json({
//             message: "Login failed",
//             error: e.message
//         });
//     }
// });

//loginEndPoint
UserDetails.post("/api/auth", async(req,res)=>{
    const {email, password} = req.body;
    try{
        //find user by email
        const result = await
            pool.query("SELECT * FROM users WHERE email = $1 ",
            [email])

        if(result.rows.length === 0){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const user = result.rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        //generate token
        const token = generateToken(user.user_id, user.role);
        res.json({message:"successfully logged in",
        token,
        user:{
            id:user.user_id,
            name:user.name,
            email:user.email,
            location:user.location,
            role:user.role
        }
        })
    }
    catch (e:any){
        console.error("Error during login:", e);
        res.status(500).json({
            message: "Login failed",
            error: e.message
        });
    }

})

export default UserDetails;