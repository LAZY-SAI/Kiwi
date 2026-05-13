import express from 'express'

const app = express()

const PORT = 8000

app.get('/', (req,res) => {
    res.send.status(
        'hello world'
    )
})


app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})