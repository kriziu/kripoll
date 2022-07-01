import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pollId = req.query.id;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId.toString() },
  });

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  const { answersVotes } = poll;

  return res.status(200).json({ answersVotes });
};

export default handler;
