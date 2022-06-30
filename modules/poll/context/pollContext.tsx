import { createContext, ReactNode, useContext } from 'react';

import { Poll } from '@prisma/client';

const pollContext = createContext<Poll>({} as Poll);

export const usePoll = () => {
  const poll = useContext(pollContext);

  return poll;
};

const PollProvider = ({
  children,
  poll,
}: {
  children: ReactNode;
  poll: Poll;
}) => {
  return <pollContext.Provider value={poll}>{children}</pollContext.Provider>;
};

export default PollProvider;
