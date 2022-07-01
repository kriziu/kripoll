import { prisma } from './prisma';

export const getPublicPoll = async (id: string) => {
  const poll = await prisma.poll.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      answers: true,
      createdAt: true,
      allowCreateAnswer: true,
      allowMultipleAnswers: true,
      requireName: true,
      endDate: true,
    },
  });

  return poll;
};
