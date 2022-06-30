import { useTimeAgo } from '@/common/hooks/useTimeAgo';

import { usePoll } from '../context/pollContext';

const Header = () => {
  const { createdAt, title } = usePoll();

  const timeAgo = useTimeAgo(createdAt);

  return (
    <div>
      <h1 className="text-3xl font-bold leading-none">{title}</h1>
      <p className="ml-1 text-sm leading-none text-zinc-400">{timeAgo}</p>
    </div>
  );
};

export default Header;
