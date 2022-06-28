import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pollId = req.query.id;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId.toString() },
  });

  console.log(poll);

  res.status(200).json(poll);
};

export default handler;
