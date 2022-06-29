import { AiOutlineClose } from 'react-icons/ai';

import type { PollConfigurationProps } from './Home';

const Options = ({
  pollConfiguration,
  setPollConfiguration,
}: PollConfigurationProps) => {
  const { options, allowCreateOption } = pollConfiguration;

  return (
    <div>
      <p className="font-bold">Options</p>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <input
              className="input"
              type="text"
              placeholder={`Enter ${index + 1} option...`}
              value={option}
              onChange={(e) =>
                setPollConfiguration({
                  ...pollConfiguration,
                  options: [
                    ...options.slice(0, index),
                    e.target.value,
                    ...options.slice(index + 1),
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
                    options: [
                      ...options.slice(0, index),
                      ...options.slice(index + 1),
                    ],
                  })
                }
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        ))}
        <div className="-mt-2 flex justify-between">
          <button
            className="btn-text"
            onClick={() =>
              setPollConfiguration({
                ...pollConfiguration,
                options: [...options, ''],
              })
            }
          >
            Add option
          </button>
          <button
            className={`btn-text ${
              allowCreateOption ? 'text-green-500' : 'text-red-500'
            }`}
            onClick={() =>
              setPollConfiguration({
                ...pollConfiguration,
                allowCreateOption: !allowCreateOption,
              })
            }
          >
            Option creation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
