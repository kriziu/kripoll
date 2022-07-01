import DatePicker from 'react-datepicker';
import { AiOutlineClose } from 'react-icons/ai';

import type { PollConfigurationProps } from './Home';

const Settings = ({
  pollConfiguration,
  setPollConfiguration,
}: PollConfigurationProps) => {
  const {
    allowMultipleAnswers,
    allowCreateAnswer,
    requireName,
    passwordToResults,
    duplicationCheck,
    endDate,
  } = pollConfiguration;

  return (
    <div>
      <p className="font-bold">Settings</p>
      <div className="flex flex-col gap-5 md:h-44 md:flex-row">
        <div className="mt-2 flex flex-1 flex-col gap-2">
          <label className="flex items-center justify-between" tabIndex={0}>
            <p className="cursor-pointer select-none font-semibold text-zinc-400">
              Allow create answer
            </p>
            <input
              type="checkbox"
              className="hidden"
              onChange={() =>
                setPollConfiguration({
                  ...pollConfiguration,
                  allowCreateAnswer: !allowCreateAnswer,
                })
              }
              checked={allowCreateAnswer}
            />
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-400/20">
              <div
                className={`h-3 w-3 rounded-full bg-violet-500 ${
                  !allowCreateAnswer && 'hidden'
                }`}
              ></div>
            </div>
          </label>

          <label className="flex items-center justify-between" tabIndex={0}>
            <p className="cursor-pointer select-none font-semibold text-zinc-400">
              Allow multiple choices
            </p>
            <input
              type="checkbox"
              className="hidden"
              onChange={() =>
                setPollConfiguration({
                  ...pollConfiguration,
                  allowMultipleAnswers: !allowMultipleAnswers,
                })
              }
              checked={allowMultipleAnswers}
            />
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-400/20">
              <div
                className={`h-3 w-3 rounded-full bg-violet-500 ${
                  !allowMultipleAnswers && 'hidden'
                }`}
              ></div>
            </div>
          </label>

          <label className="flex items-center justify-between" tabIndex={0}>
            <p className="cursor-pointer select-none font-semibold text-zinc-400">
              Require name
            </p>
            <input
              type="checkbox"
              className="hidden"
              onChange={() =>
                setPollConfiguration({
                  ...pollConfiguration,
                  requireName: !requireName,
                })
              }
              checked={requireName}
            />
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-400/20">
              <div
                className={`h-3 w-3 rounded-full bg-violet-500 ${
                  !requireName && 'hidden'
                }`}
              ></div>
            </div>
          </label>

          <label>
            <p className="font-semibold text-zinc-400">
              Password to results{' '}
              <span className="text-zinc-600">(optional)</span>
            </p>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={passwordToResults}
              onChange={(e) =>
                setPollConfiguration({
                  ...pollConfiguration,
                  passwordToResults: e.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="h-px w-full bg-zinc-600 md:h-full md:w-px"></div>

        <div className="mt-2 flex flex-1 flex-col gap-2">
          <label>
            <p className="font-semibold text-zinc-400">Duplication checking</p>
            <select
              className="input appearance-none focus:bg-zinc-700/75"
              value={duplicationCheck}
              onChange={(e) => {
                if (
                  e.target.value === 'NONE' ||
                  e.target.value === 'IP' ||
                  e.target.value === 'COOKIE'
                )
                  setPollConfiguration({
                    ...pollConfiguration,
                    duplicationCheck: e.target.value as
                      | 'NONE'
                      | 'COOKIE'
                      | 'IP',
                  });
              }}
            >
              <option value="IP">IP address</option>
              <option value="COOKIE">Cookie based</option>
              <option value="NONE">None</option>
            </select>
          </label>

          <label>
            <p className="font-semibold text-zinc-400">
              End date <span className="text-zinc-600">(optional)</span>
            </p>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(e) =>
                  setPollConfiguration({
                    ...pollConfiguration,
                    endDate: e === null ? undefined : e,
                  })
                }
                nextMonthButtonLabel=">"
                previousMonthButtonLabel="<"
                excludeDateIntervals={[
                  {
                    start: new Date(0),
                    end: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  },
                ]}
                placeholderText="dd/mm/yyyy"
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
              />
              {endDate && (
                <button
                  className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-lg bg-zinc-600 transition-colors hover:bg-zinc-500"
                  onClick={(e) => {
                    setPollConfiguration({
                      ...pollConfiguration,
                      endDate: undefined,
                    });
                    e.preventDefault();
                  }}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
