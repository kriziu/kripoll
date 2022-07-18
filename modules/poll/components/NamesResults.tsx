import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';

import { usePoll } from '../hooks/usePoll';

const NamesResults = ({
  namesVoted,
}: {
  namesVoted: NameVoted[] | undefined;
}) => {
  const { poll } = usePoll();

  return (
    <div className="mt-5">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold leading-none">
        <BsFillPeopleFill /> Who voted what?
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-1">
          <thead>
            <tr>
              <th className=""></th>
              {poll?.answers.map((answer, index) => (
                <th key={index} className="">
                  {answer}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {namesVoted?.map((nameVoted, index) => (
              <tr key={index}>
                <td>
                  <p
                    className="max-w-[10rem] overflow-hidden truncate"
                    title={nameVoted.name}
                  >
                    {nameVoted.name}
                  </p>
                </td>
                {poll?.answers.map((_, answerIndex) => {
                  const voted = nameVoted.voted.some(
                    (indexVoted) => indexVoted === answerIndex
                  );

                  return (
                    <td key={`${answerIndex}${index}`}>
                      <div
                        className={`${
                          voted ? 'bg-green-500/50' : 'bg-red-500/50'
                        } flex h-full items-center justify-center rounded-md p-2`}
                        key={answerIndex}
                      >
                        {voted ? <AiOutlineCheck /> : <AiOutlineClose />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NamesResults;
