export const adminAuth = (req:any, res:any, next:any)=>{
    console.log("userRole:", req.userRole, typeof req.userRole);
    console.log("userRole from token:", req.userRole);
    if(req.userRole!=="admin")
    {
        return res.status(403).json({ message: "Forbidden" });
    }
    next()
}