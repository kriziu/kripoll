import { NextApiRequest, NextApiResponse } from 'next';

import { pinCodes } from './generate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pin } = req.query;
  if (!pin) return res.status(400).json({ error: 'Missing pin id' });

  if (!pinCodes.has(pin.toString()))
    return res.status(404).json({ error: 'Pin not found' });

  const id = pinCodes.get(pin.toString())!;

  return res.status(200).json({ id });
};

export default handler;
