import { AiOutlineClose } from 'react-icons/ai';

import type { PollConfigurationProps } from './Home';

const Answers = ({
  pollConfiguration,
  setPollConfiguration,
}: PollConfigurationProps) => {
  const { answers } = pollConfiguration;

  return (
    <div>
      <p className="font-bold">Answers</p>
      <div className="flex flex-col gap-3">
        {answers.map((answer, index) => (
          <div key={index} className="relative">
            <input
              className="input"
              type="text"
              placeholder={`Enter ${index + 1} answer...`}
              value={answer}
              onChange={(e) =>
                setPollConfiguration({
                  ...pollConfiguration,
                  answers: [
                    ...answers.slice(0, index),
                    e.target.value,
                    ...answers.slice(index + 1),
                  ],
                })
              }
            />
            {index >= 2 && (
              <button
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-lg bg-zinc-600 transition-colors hover:bg-zinc-500"
                onClick={() =>
                  setPollConfiguration({
                    ...pollConfiguration,
                    answers: [
                      ...answers.slice(0, index),
                      ...answers.slice(index + 1),
                    ],
                  })
                }
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        ))}
        <button
          className="btn-text -mt-2"
          onClick={() =>
            setPollConfiguration({
              ...pollConfiguration,
              answers: [...answers, ''],
            })
          }
        >
          Add answer
        </button>
      </div>
    </div>
  );
};

export default Answers;
