import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

interface CreateRequest extends NextApiRequest {
  body: PollConfiguration;
}

const handler = async (req: CreateRequest, res: NextApiResponse) => {
  const { passwordToResults } = req.body;

  let hashedPassword: string | null = null;
  if (passwordToResults)
    hashedPassword = await bcrypt.hash(passwordToResults, 10);

  const newPoll = await prisma.poll.create({
    data: {
      ...req.body,
      passwordToResults: hashedPassword,
      answersVotes: req.body.answers.map(() => 0),
      namesVoted: [],
    },
  });

  res.status(200).json({ id: newPoll.id });
};

export default handler;
