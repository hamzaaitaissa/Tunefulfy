// pages/api/generateAlbum.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not defined in environment variables');
    }
    const response = await axios.get(`https://1001albumsgenerator.com/api/v1/projects/${apiKey}`);
    res.status(200).json(response.data.currentAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }



}
