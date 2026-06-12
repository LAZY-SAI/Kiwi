import { Router } from "express";
import { tokenAuthentication } from "../middleware/TokenAuthentication";
import { getUserDetails, signupUser, loginUser, logoutUser } from "../controllers/user.controller";

const UserDetails = Router();
//store user information
UserDetails.get("/api/me", tokenAuthentication, getUserDetails);

// GET user profile (Protected)
UserDetails.get("/api/users", tokenAuthentication, getUserDetails);

// POST signup new user
UserDetails.post("/api/signup", signupUser);

// POST login user
UserDetails.post("/api/login", loginUser);

//post logout
UserDetails.post("/api/logout",logoutUser)



export default UserDetails;