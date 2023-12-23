// pages/api/generateAlbum.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API = process.env.API_KEY
  try {
    const response = await axios.get(API!);
    res.status(200).json(response.data.currentAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }



}
