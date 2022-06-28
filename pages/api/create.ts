import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/common/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.poll.create({
    data: {
      title: 'My first poll',
      optionLabels: ['Option 1', 'Option 2'],
      optionVotes: [0, 0],
      duplicationCheck: 'IP',
    },
  });

  res.status(200).end();
};

export default handler;
