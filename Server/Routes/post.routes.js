import express from 'express';
import dotenv from "dotenv"
import {v2 as cloudinary} from 'cloudinary';
import { prisma } from '../lib/index.js';
import cors from 'cors'
import {client} from "../config/index.js"

dotenv.config()

const app = express();
app.use(cors())



const router = express.Router();

cloudinary.config({ 
    cloud_name: process.env.COULADINARY_CLOUD_NAME, 
    api_key: process.env.COULADINARY_API_KEY, 
    api_secret: process.env.COULADINARY_API_SECRETE
  });
  

router.get("/", async (req, res) => {
   
   try {
      if((await client.exists("posts")).length>0)
      {
         res.status(200).json({success:true,data:client.get("posts")})
      }
      else
      {
        const posts= await prisma.post.findMany({})
        await client.set("posts",JSON.stringify(posts))
        res.status(200).json({success:true,data:posts})
      }

   
      
   } catch (error) {
       console.log(error.message)
       res.status(500).json({success:false,message:error.message})
   }

})


router.post("/",async (req, res) => {
  
  try {
       const {name, prompt,photo}=req.body

       const photoUrl = await cloudinary.uploader.upload(photo)
       const newPost= await prisma.post.create({data:{name,prompt,photo:photoUrl.url}})
     client.del("posts")
     res.status(200).json({success:true,data:newPost})

  } catch (error) {
       console.log(error)
       res.status(500).json({success:false,message:error.message})

  }

})

export default router
