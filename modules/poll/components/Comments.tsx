import { AiOutlineComment } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

import WriteComment from './WriteComment';

const Comment = () => {
  return (
    <div className="flex gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-400/20">
        <FaUserAlt className="h-5 w-5 fill-zinc-500" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm text-zinc-400">
          John Doe | 3 weeks ago - <button className="text-white">Reply</button>
        </p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, nisi eu consectetur consectetur, nisl nisi consectetur, nisl
          nisi consectetur, nisl nisi consectetur.
        </p>
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="my-24 mt-10">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <AiOutlineComment /> Comments
      </h2>
      <WriteComment />
      <div className="mt-10">
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
