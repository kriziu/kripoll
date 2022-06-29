import { useState } from 'react';

import { useInterval } from 'react-use';

import { generateTimeAgo } from '../lib/generateTimeAgo';

const useTimeAgo = (date: Date) => {
  const [timeAgo, setTimeAgo] = useState(generateTimeAgo(date));

  useInterval(() => {
    setTimeAgo(generateTimeAgo(date));
  }, 1000);

  return timeAgo;
};

export { useTimeAgo };
