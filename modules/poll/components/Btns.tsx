import { Dispatch, SetStateAction } from 'react';

import { BiArrowBack, BiStation } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';

const Btns = ({
  results,
  setResults,
}: {
  results?: boolean;
  setResults: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="mt-6 flex w-full gap-4">
      {results && (
        <div className="btn flex flex-1 select-none items-center justify-center gap-1 from-lime-500 to-green-600">
          <BiStation /> Live results
        </div>
      )}
      {!results && <button className="btn flex-1">Vote</button>}

      <div className="flex flex-1 gap-4">
        {results && (
          <button
            className="btn-secondary flex flex-1 items-center justify-center gap-1"
            onClick={() => setResults(false)}
          >
            <BiArrowBack /> Poll
          </button>
        )}
        {!results && (
          <button
            className="btn-secondary flex flex-1 items-center justify-center gap-1"
            onClick={() => setResults(true)}
          >
            <IoIosStats /> Results
          </button>
        )}

        <button className="btn-secondary flex flex-1 items-center justify-center gap-1">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default Btns;
