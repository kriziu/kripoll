import { NextApiRequest, NextApiResponse } from 'next';

import { getPublicPoll } from '@/common/lib/getPublicPoll';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pollId = req.query.id;

  if (!pollId) return res.status(400).json({ error: 'Missing poll id' });

  const poll = await getPublicPoll(pollId.toString());

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  return res.status(200).json(poll);
};

export default handler;
