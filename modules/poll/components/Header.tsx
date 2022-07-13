import { useTimeAgo } from '@/common/hooks/useTimeAgo';

import { usePoll } from '../hooks/usePoll';

const Header = () => {
  const { poll } = usePoll();

  const { createdAt, title, description } = poll || {};

  const timeAgo = useTimeAgo(createdAt || new Date());

  return (
    <div>
      <h1 className="text-3xl font-bold leading-none">{title}</h1>
      <p className="ml-1 mt-1 text-sm leading-none text-zinc-400">{timeAgo}</p>
      {description && (
        <p className="mt-4 leading-none text-zinc-400">{description}</p>
      )}
    </div>
  );
};

export default Header;
