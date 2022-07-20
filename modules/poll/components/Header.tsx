import { useTimeAgo } from '@/common/hooks/useTimeAgo';

import { usePoll } from '../hooks/usePoll';

const Header = () => {
  const { poll, pinCode } = usePoll();

  const { createdAt, title, description, endDate } = poll || {};

  const timeAgo = useTimeAgo(createdAt || new Date());

  return (
    <div className="relative">
      {pinCode && (
        <p className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-violet-300 px-2 py-1 text-lg font-semibold text-violet-700 md:right-0">
          Pin code: {pinCode}
        </p>
      )}

      <h1 className="text-3xl font-bold leading-none">{title}</h1>
      {endDate && (
        <p
          className={`mb-2 text-sm font-semibold leading-none ${
            new Date(endDate).getTime() < Date.now()
              ? 'text-red-500'
              : 'text-green-500'
          }`}
        >
          Ending: {new Date(endDate).toLocaleString()}
        </p>
      )}
      <p className="ml-1 mt-1 text-sm leading-none text-zinc-400">{timeAgo}</p>
      {description && (
        <p className="mt-4 leading-none text-zinc-400">{description}</p>
      )}
    </div>
  );
};

export default Header;
