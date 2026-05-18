import express from 'express'
import dotenv from "dotenv";
dotenv.config()
import UserDetails from './routes/admin.user'
import cors from 'cors';

const app = express()
const PORT = 8000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    {
        origin:`${process.env.FRONTEND_URI}`,
        methods:["GET", "POST","DELETE","PATCH","PUT"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
))
// app.get('/', (req,res) => {
//     res.send.status(
//         'hello world'
//     )
// })

app.use(UserDetails)
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})