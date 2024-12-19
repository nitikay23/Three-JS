// import express from 'express';
// import * as dotenv from 'dotenv';
// import { OpenAI } from "openai";

// dotenv.config();

// const router = express.Router();
// const openai = new OpenAI({ 
//     apiKey: process.env.OPENAI_API_KEY,
//  });
// // const config = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // const openai = new OpenAIApi(config);

// router.route('/').get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E ROUTES" })
// })

// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.createImage({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json'
//     });

//     const image = response.data.data[0].b64_json;

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" })
//   }
// })

// export default router;
import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is correct and loaded from your .env file
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = response.data[0]; // Adjust based on how the response structure is returned
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
});

export default router;
