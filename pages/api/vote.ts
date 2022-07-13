import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';
import type { VoteType } from '@/modules/poll/components/Btns';

interface VoteRequest extends NextApiRequest {
  body: VoteType;
}

const handler = async (req: VoteRequest, res: NextApiResponse) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const { pollId, checkedAnswers } = req.body;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
  });

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  const newVotes = poll.answersVotes.map((votes, index) => {
    if (checkedAnswers.includes(index)) return votes + 1;
    return votes;
  });

  console.log('IP ADDRESS ', ip);

  await prisma.poll.update({
    where: { id: pollId },
    data: {
      answersVotes: newVotes,
    },
  });

  // return res.status(403).end();

  return res.status(200).json({ message: 'Voted successfully' });
};

export default handler;
