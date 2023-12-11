// pages/api/generateAlbum.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("first")
  try {
    const response = await axios.get('https://1001albumsgenerator.com/api/v1/projects/64e7c6cf2d57e92c93b7e4ad');
    res.status(200).json(response.data.currentAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }



}
