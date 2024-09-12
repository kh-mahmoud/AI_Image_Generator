import express from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import octoRouter from "./Routes/octo.routes.js"
import postRouter from "./Routes/post.routes.js"

const app = express()

app.use(express.json());


app.use(cors())
dotenv.config()


app.use('/api/v1/octo', octoRouter)
app.use('/api/v1/post', postRouter);



const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log(`server work on port ${port}`)
})
