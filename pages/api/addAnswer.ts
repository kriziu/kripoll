import { NextApiRequest, NextApiResponse } from 'next';

import { getPublicPoll } from '@/common/lib/getPublicPoll';
import { prisma } from '@/common/lib/prisma';

interface AddAnswerRequest extends NextApiRequest {
  body: {
    pollId: string;
    answer: string;
  };
}

const handler = async (req: AddAnswerRequest, res: NextApiResponse) => {
  const { pollId, answer } = req.body;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
  });

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  await prisma.poll.update({
    where: { id: pollId },
    data: {
      answers: [...poll.answers, answer],
      answersVotes: [...poll.answersVotes, 0],
    },
  });

  const publicPoll = await getPublicPoll(pollId);

  return res.status(200).json(publicPoll);
};

export default handler;
