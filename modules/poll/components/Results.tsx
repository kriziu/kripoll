import { Dispatch, SetStateAction } from 'react';

import axios, { AxiosError } from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';

import Loader from '@/common/components/Loader';
import { COLORS } from '@/common/constants/COLORS';

import { usePoll } from '../hooks/usePoll';
import Answers from './Answers';
import AnswerScore from './AnswerScore';
import Btns from './Btns';
import NamesResults from './NamesResults';
import PasswordModal from './PasswordModal';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = ({
  setResults,
  password,
  setPassword,
}: {
  setResults: Dispatch<SetStateAction<boolean>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  const { poll } = usePoll();

  const { id } = useRouter().query;

  const { data, isLoading, error, refetch } = useQuery(
    ['results', id],
    async () => {
      const res = await axios.get<{
        answersVotes: number[];
        namesVoted: NameVoted[] | undefined;
      }>(`/api/results?id=${id}&password=${password}`);
      return res.data;
    },
    {
      retry: false,
      refetchInterval: (res) => {
        if (!res) return false;
        return 2000;
      },
    }
  );

  if (error || isLoading || !data) {
    return (
      <>
        <Answers setResults={() => {}} />
        {error && (
          <PasswordModal
            setPassword={setPassword}
            password={password}
            getResults={() => refetch()}
            error={(error as AxiosError).response?.status === 401}
          />
        )}

        {isLoading && <Loader />}
      </>
    );
  }

  const totalVotes = data.answersVotes.reduce(
    (total, votes) => total + votes,
    0
  );

  const chartData = {
    labels: poll?.answers,
    datasets: [
      {
        data: data.answersVotes,
        backgroundColor: COLORS,
        borderWidth: 0,
      },
    ],
  };

  const shouldRenderChart = data.answersVotes.some((votes) => votes > 0);

  return (
    <AnimatePresence>
      <>
        {(error || isLoading || !data) && (
          <>
            <Answers setResults={() => {}} />
            {error && (
              <PasswordModal
                setPassword={setPassword}
                password={password}
                getResults={() => refetch()}
                error={(error as AxiosError).response?.status === 401}
              />
            )}

            {isLoading && <Loader />}
          </>
        )}

        {!error && !isLoading && data && (
          <>
            <div className="mt-3 flex flex-col-reverse gap-4 md:flex-row">
              <div className="flex flex-1 flex-col gap-2">
                {poll?.answers.map((option, index) => {
                  const votes = data.answersVotes[index];

                  return (
                    <AnswerScore
                      key={index}
                      title={option}
                      score={totalVotes ? (votes / totalVotes) * 100 : 0}
                      votes={votes}
                      color={COLORS[index % COLORS.length]}
                    />
                  );
                })}

                <div className="mt-3 mb-1 h-[2px] w-full bg-zinc-800"></div>

                <p className="text-sm font-semibold">
                  Total votes: {totalVotes}
                </p>
              </div>

              {shouldRenderChart && (
                <div className="flex w-full justify-center md:w-2/5">
                  <div className="w-1/2 min-w-[15rem] md:w-full">
                    <Pie
                      data={chartData}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {poll?.requireName && <NamesResults namesVoted={data.namesVoted} />}

            <Btns results setResults={setResults} />
          </>
        )}
      </>
    </AnimatePresence>
  );
};

export default Results;
