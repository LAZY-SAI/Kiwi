import express from 'express'

import dotenv from "dotenv";
dotenv.config()
import UserDetails from './routes/user'
import cors from 'cors';
import cookieParser from "cookie-parser";
import BrandsDetails from "./routes/stock";
import Orders from "./routes/orders";
import RefreshToken from "./routes/refresh";
const app = express()
const PORT = 8000
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    {
        origin:`${process.env.FRONTEND_URI}`,
        methods:["GET", "POST","DELETE","PATCH","PUT"],
        allowedHeaders: ["Content-Type"],
        credentials:true
    }
))


app.use(UserDetails)
app.use(BrandsDetails)
app.use(Orders)
app.use(RefreshToken)
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})