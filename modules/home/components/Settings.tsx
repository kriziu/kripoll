import { useState } from 'react';

import DatePicker from 'react-datepicker';

const Settings = () => {
  const [multiple, setMultiple] = useState(false);
  const [name, setName] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <p className="font-bold">Settings</p>
      <div className="flex flex-col gap-5 md:h-36 md:flex-row">
        <div className="mt-2 flex flex-1 flex-col gap-2">
          <label className="flex items-center justify-between">
            <p className="cursor-pointer select-none font-semibold text-zinc-400">
              Allow multiple choices
            </p>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => setMultiple((prev) => !prev)}
              checked={multiple}
            />
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-400/20">
              <div
                className={`h-3 w-3 rounded-full bg-violet-500 ${
                  !multiple && 'hidden'
                }`}
              ></div>
            </div>
          </label>

          <label className="flex items-center justify-between">
            <p className="cursor-pointer select-none font-semibold text-zinc-400">
              Require name
            </p>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => setName((prev) => !prev)}
              checked={name}
            />
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-400/20">
              <div
                className={`h-3 w-3 rounded-full bg-violet-500 ${
                  !name && 'hidden'
                }`}
              ></div>
            </div>
          </label>

          <label>
            <p className="font-semibold text-zinc-400">
              Password to results{' '}
              <span className="text-zinc-600">(optional)</span>
            </p>
            <input type="text" className="input" placeholder="Password" />
          </label>
        </div>

        <div className="h-px w-full bg-zinc-600 md:h-full md:w-px"></div>

        <div className="mt-2 flex flex-1 flex-col gap-2">
          <label>
            <p className="font-semibold text-zinc-400">Duplication checking</p>
            <select className="input appearance-none focus:bg-zinc-700/75">
              <option>IP address</option>
              <option>Cookie based</option>
              <option>None</option>
            </select>
          </label>

          <label>
            <p className="font-semibold text-zinc-400">
              End date <span className="text-zinc-600">(optional)</span>
            </p>
            <DatePicker
              selected={date}
              onChange={(e) => setDate(e)}
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
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
