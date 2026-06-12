import {verifyToken} from "../utils/auth";

export const tokenAuthentication = (req:any, res:any, next:any) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message:"Unauthorized"})

    const { payload, error } = verifyToken(token); // destructure the result

    if (error || !payload) {
        return res.status(401).json({message: "Unauthorized", reason: error});
    }

    // @ts-ignore
    req.userId = payload.userId
    // @ts-ignore
    req.userRole = payload.role

    next()
}