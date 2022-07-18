import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation } from 'react-query';

import Loader from '@/common/components/Loader';

import { usePoll } from '../hooks/usePoll';
import type { PublicPoll } from '../hooks/usePoll';
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
  const { poll, refetch } = usePoll();

  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);

  const [newAnswer, setNewAnswer] = useState('');
  const [name, setName] = useState('');

  const addOptionMutation = useMutation(
    () =>
      axios.post<PublicPoll>('/api/addAnswer', {
        pollId: poll?.id,
        answer: newAnswer,
      }),
    {
      onSuccess: () => {
        refetch();
        setNewAnswer('');
      },
    }
  );

  const handleAddNewAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addOptionMutation.mutate();
  };

  if (!poll) return null;

  const { answers, allowCreateAnswer, allowMultipleAnswers, requireName } =
    poll;

  return (
    <>
      {addOptionMutation.isLoading && <Loader />}
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
            <label htmlFor="answer">Add new answer:</label>
            <form className="relative" onSubmit={handleAddNewAnswer}>
              <input
                type="text"
                className="input"
                id="answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-lg bg-zinc-600 transition-colors hover:bg-zinc-500"
                type="submit"
              >
                <AiOutlinePlus />
              </button>
            </form>
          </div>
        )}

        {requireName && (
          <div>
            <label htmlFor="nameanswer">Your name:</label>
            <input
              type="text"
              className="input"
              id="nameanswer"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
      </div>
      <Btns
        setResults={setResults}
        checkedAnswers={checkedAnswers}
        name={name}
      />
    </>
  );
};

export default Answers;
