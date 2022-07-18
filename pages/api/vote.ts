import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';
import type { VoteType } from '@/modules/poll/components/Btns';

interface VoteRequest extends NextApiRequest {
  body: VoteType;
}

const handler = async (req: VoteRequest, res: NextApiResponse) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const { pollId, checkedAnswers, name } = req.body;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
  });

  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  if (poll.endDate && poll.endDate.getTime() < Date.now())
    return res.status(400).json({ error: 'Poll is closed' });

  if (
    (poll.duplicationCheck === 'IP' || poll.duplicationCheck === 'COOKIE') &&
    (poll.votedIPs.includes(ip.toString()) || req.cookies['poll-vote'])
  )
    return res.status(403).json({ error: 'You have already voted' });

  const newVotes = poll.answersVotes.map((votes, index) => {
    if (checkedAnswers.includes(index)) return votes + 1;
    return votes;
  });

  const namesVoted = poll.namesVoted as unknown as NameVoted[];

  await prisma.poll.update({
    where: { id: pollId },
    data: {
      answersVotes: newVotes,
      namesVoted: [...namesVoted, { name, voted: checkedAnswers }],
    },
  });

  if (poll.duplicationCheck === 'IP')
    await prisma.poll.update({
      where: { id: pollId },
      data: {
        votedIPs: {
          push: ip?.toString(),
        },
      },
    });

  if (poll.duplicationCheck === 'COOKIE')
    res.setHeader(
      'Set-Cookie',
      serialize('poll-vote', pollId, {
        path: `/${poll.id}`,
      })
    );

  return res.status(200).json({ message: 'Voted successfully' });
};

export default handler;
