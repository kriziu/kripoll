import { NextApiRequest, NextApiResponse } from 'next';

import { getPublicPoll } from '@/common/lib/getPublicPoll';

import { pinCodes } from './generate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing poll id' });

  const poll = await getPublicPoll(id.toString());

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  let foundPinCode: string | undefined;
  [...pinCodes.entries()].forEach(([pinCode, pollId]) => {
    if (pollId === id.toString()) foundPinCode = pinCode;
  });

  return res.status(200).json({ poll, pinCode: foundPinCode });
};

export default handler;
