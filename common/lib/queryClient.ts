import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  logger: {
    log: () => {},
    error: () => {},
    warn: () => {},
  },
});
