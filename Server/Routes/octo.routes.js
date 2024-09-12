import { OctoAIClient } from "@octoai/sdk";





import express from 'express';
import dotenv from "dotenv"



dotenv.config()

const router = express.Router();


const client = new OctoAIClient({ apiKey: process.env.OCTOAI_API_KEY });



router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.imageGen.generateFluxSchnell({
      prompt
    });

    res.status(200).json({url:response.images[0].imageB64})

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }


})

export default router
