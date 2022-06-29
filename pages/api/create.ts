import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

interface CreateRequest extends NextApiRequest {
  body: PollConfiguration;
}

const handler = async (req: CreateRequest, res: NextApiResponse) => {
  const newPoll = await prisma.poll.create({
    data: { ...req.body, optionVotes: req.body.options.map(() => 0) },
  });

  res.status(200).json({ id: newPoll.id });
};

export default handler;
