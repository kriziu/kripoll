import { useRouter } from 'next/router';

import Answers from './Answers';
import Btns from './Btns';
import Comments from './Comments';
import Header from './Header';

const Poll = () => {
  const { id } = useRouter().query;

  console.log(id);

  return (
    <div className="flex h-full w-full flex-col items-center py-24">
      <div className="px-4 sm:w-96 sm:px-0 md:w-160">
        <Header />
        <Answers />
        <Btns />
        <Comments />
      </div>
    </div>
  );
};

export default Poll;
