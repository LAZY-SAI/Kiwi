import {generateRefreshToken} from "../utils/auth";

export const refreshToken=async(req:any, res:any)=>{
    const token = req.cookies.refreshToken;
    const refreshToken = generateRefreshToken(user.user_Id,user.role)
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })

}