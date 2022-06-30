import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { usePoll } from '../context/pollContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const OptionScore = ({
  title,
  score,
  votes,
  color,
}: {
  title: string;
  color: string;
  score: number;
  votes: number;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <p>{title}</p>
        <p className="text-xs text-zinc-400">{`${score.toFixed(
          2
        )}% (${votes} votes)`}</p>
      </div>
      <div className="h-5 w-full rounded-lg bg-zinc-400/20">
        <div
          className={`h-5 rounded-lg ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

const Results = () => {
  const { options, optionVotes } = usePoll();

  const totalVotes = optionVotes.reduce((total, votes) => total + votes, 0);

  const data = {
    labels: options,
    datasets: [
      {
        label: '# of Votes',
        data: optionVotes,
        backgroundColor: ['#22c55e', '#ef4444', '#3b82f6', '#8b5cf6'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="mt-3 flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        {options.map((option, index) => {
          const votes = optionVotes[index];

          return (
            <OptionScore
              key={index}
              title={option}
              score={totalVotes ? (votes / totalVotes) * 100 : 0}
              votes={votes}
              color="bg-green-500"
            />
          );
        })}

        <div className="mt-3 mb-1 h-[2px] w-full bg-zinc-800"></div>

        <p className="text-sm font-semibold">Total votes: {totalVotes}</p>
      </div>
      <div className="flex w-full justify-center md:w-2/5">
        <div className="w-1/2 min-w-[15rem] md:w-full">
          <Pie
            data={data}
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
    </div>
  );
};

export default Results;
