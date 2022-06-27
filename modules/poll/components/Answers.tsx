import { useEffect, useState } from 'react';

const Answer = ({ title }: { title: string }) => {
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    setId(Math.random().toString());
  }, []);

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        onChange={() => setChecked((prev) => !prev)}
        checked={checked}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="flex w-max cursor-pointer select-none items-center gap-2"
      >
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
  return (
    <div className="flex flex-col gap-3">
      <p className="mt-3 font-semibold">Make a choice:</p>

      <Answer title="Apple" />
      <Answer title="Banana" />
      <Answer title="Orange" />
      <Answer title="Strawberry" />

      <div>
        <label htmlFor="option">Add new option:</label>
        <input type="text" className="input" id="option" />
      </div>

      <div>
        <label htmlFor="nameoption">Your name:</label>
        <input type="text" className="input" id="nameoption" />
      </div>
    </div>
  );
};

export default Answers;
