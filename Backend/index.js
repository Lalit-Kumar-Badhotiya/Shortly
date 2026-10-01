import express from 'express'
import 'dotenv/config'
import userRouter from './routes/user.routes.js'
import urlRouter from './routes/url.routes.js'
import { authenticationMiddleware } from './middlewares/auth.middleware.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(authenticationMiddleware)

app.use('/user',userRouter)
app.use('/',urlRouter)

app.get('/', (req,res)=>{
    res.send("Server is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
