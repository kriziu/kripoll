import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pollId = req.query.id;

  if (!pollId) return res.status(400).json({ error: 'Missing poll id' });

  const poll = await prisma.poll.findUnique({
    where: { id: pollId.toString() },
  });

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  if (poll.passwordToResults) {
    const { password } = req.query;

    if (!password) return res.status(400).json({ error: 'Missing password' });

    if (!(await bcrypt.compare(password.toString(), poll.passwordToResults)))
      return res.status(401).json({ error: 'Wrong password' });
  }

  const { answersVotes, namesVoted } = poll;

  return res.status(200).json({ answersVotes, namesVoted });
};

export default handler;
