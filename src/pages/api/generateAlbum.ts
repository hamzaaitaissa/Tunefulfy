// pages/api/generateAlbum.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const response = await axios.get('https://1001albumsgenerator.com/api/v1/projects/658716ae1dcb2b08e6e37c32');
    res.status(200).json(response.data.currentAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }



}
