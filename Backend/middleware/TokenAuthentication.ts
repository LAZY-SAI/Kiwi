import jwt from "jsonwebtoken";
import {verifyToken} from "../utils/auth";

export const tokenAuthentication = (req:any, res:any, next:any)=>{
    const authHeader = req.headers.authorization; //get the authorization from the header
    const token = authHeader && authHeader.split(' ')[1] //extract the token "<BEARER (TOKEN)>

    if(!token) return res.status(401).json({message:"Unauthorized"})
    try{
        const decoded = verifyToken(token)

        // @ts-ignore
        req.userId = decoded.userId
        // @ts-ignore
        req.userRole = decoded.role

        next()
    }
    catch (error){
        return res.status(401).json({message:"Unauthorized"})
    }


}