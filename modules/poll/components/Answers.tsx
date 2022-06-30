import { useState } from 'react';

import { usePoll } from '../context/pollContext';

const Answer = ({ title }: { title: string }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <label className="flex w-max cursor-pointer select-none items-center gap-2">
        <input
          type="checkbox"
          onChange={() => setChecked((prev) => !prev)}
          checked={checked}
          className="hidden"
        />
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-400/20">
          <div
            className={`h-3 w-3 rounded-full bg-violet-500 ${
              !checked && 'hidden'
            }`}
          ></div>
        </div>
        <p>{title}</p>
      </label>
    </div>
  );
};

const Answers = () => {
  const { answers, allowCreateAnswer, allowMultipleAnswers } = usePoll();

  return (
    <div className="flex flex-col gap-3">
      <p className="mt-3 font-semibold">Make a choice:</p>

      {answers.map((answer, index) => (
        <Answer key={index} title={answer} />
      ))}

      {allowCreateAnswer && (
        <div>
          <label htmlFor="option">Add new option:</label>
          <input type="text" className="input" id="option" />
        </div>
      )}

      {allowMultipleAnswers && (
        <div>
          <label htmlFor="nameoption">Your name:</label>
          <input type="text" className="input" id="nameoption" />
        </div>
      )}
    </div>
  );
};

export default Answers;
