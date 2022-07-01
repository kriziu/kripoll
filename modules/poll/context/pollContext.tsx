import { createContext, ReactNode, useContext } from 'react';

import type { Poll } from '@prisma/client';

export type PublicPoll = Omit<
  Poll,
  'answersVotes' | 'duplicationCheck' | 'votedIPs' | 'passwordToResults'
>;

const pollContext = createContext<{
  poll: PublicPoll;
  setPoll: (poll: PublicPoll) => void;
}>({} as any);

export const usePoll = () => {
  const { poll } = useContext(pollContext);

  return poll;
};

export const useSetPoll = () => {
  const { setPoll } = useContext(pollContext);

  return setPoll;
};

const PollProvider = ({
  children,
  poll,
  setPoll,
}: {
  children: ReactNode;
  poll: PublicPoll;
  setPoll: (poll: PublicPoll) => void;
}) => {
  return (
    <pollContext.Provider value={{ poll, setPoll }}>
      {children}
    </pollContext.Provider>
  );
};

export default PollProvider;
