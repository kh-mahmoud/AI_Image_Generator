import express from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import octoRouter from "./Routes/octo.routes.js"
import postRouter from "./Routes/post.routes.js"

const app = express()

// Increase the payload size limit to 10 MB(adjust this value as needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));



const corsOptions = {
    origin: 'https://octoai-image-generator-psi.vercel.app',
    optionsSuccessStatus: 200
}




app.use(cors(corsOptions))
dotenv.config()


app.use('/api/v1/octo', octoRouter)
app.use('/api/v1/post', postRouter);



const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log(`server work on port ${port}`)
})
