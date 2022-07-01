import { NextApiRequest, NextApiResponse } from 'next';

import { getPublicPoll } from '@/common/lib/getPublicPoll';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pollId = req.query.id;

  const poll = await getPublicPoll(pollId.toString());

  res.status(200).json(poll);
};

export default handler;
