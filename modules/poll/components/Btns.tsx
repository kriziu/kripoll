import { FaShare } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';

const Btns = () => {
  return (
    <div className="mt-6 flex w-full gap-4">
      <button className="btn flex-1">Vote</button>
      <div className="flex flex-1 gap-4">
        <button className="btn-secondary flex flex-1 items-center justify-center gap-1">
          <IoIosStats /> Results
        </button>
        <button className="btn-secondary flex flex-1 items-center justify-center gap-1">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default Btns;
