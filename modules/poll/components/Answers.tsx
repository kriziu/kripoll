import { Dispatch, SetStateAction, useState } from 'react';

import { usePoll } from '../context/pollContext';
import Btns from './Btns';

const Answer = ({
  title,
  checked,
  onCheck,
}: {
  title: string;
  checked: boolean;
  onCheck: () => void;
}) => {
  return (
    <div>
      <label className="flex w-max cursor-pointer select-none items-center gap-2">
        <input
          type="checkbox"
          onChange={onCheck}
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

const Answers = ({
  setResults,
}: {
  setResults: Dispatch<SetStateAction<boolean>>;
}) => {
  const { answers, allowCreateAnswer, allowMultipleAnswers, requireName } =
    usePoll();

  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  // const [name, setName] = useState('');

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="mt-3 font-semibold">Make a choice:</p>

        {answers.map((answer, index) => (
          <Answer
            key={index}
            title={answer}
            checked={checkedAnswers.includes(index)}
            onCheck={() =>
              setCheckedAnswers((prev) => {
                if (prev.includes(index))
                  return prev.filter((i) => i !== index);
                if (allowMultipleAnswers) return [...prev, index];
                return [index];
              })
            }
          />
        ))}

        {allowCreateAnswer && (
          <div>
            <label htmlFor="option">Add new option:</label>
            <input type="text" className="input" id="option" />
          </div>
        )}

        {requireName && (
          <div>
            <label htmlFor="nameoption">Your name:</label>
            <input type="text" className="input" id="nameoption" />
          </div>
        )}
      </div>
      <Btns setResults={setResults} checkedAnswers={checkedAnswers} />
    </>
  );
};

export default Answers;
