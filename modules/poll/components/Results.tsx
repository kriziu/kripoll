import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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

const data = {
  labels: ['Apple', 'Banana', 'Orange', 'Strawberry'],
  datasets: [
    {
      label: '# of Votes',
      data: [200, 20, 54, 5],
      backgroundColor: ['#22c55e', '#ef4444', '#3b82f6', '#8b5cf6'],
      borderWidth: 0,
    },
  ],
};

const Results = () => {
  return (
    <div className="mt-3 flex gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <OptionScore
          title="Apple"
          score={64.1}
          votes={200}
          color="bg-green-500"
        />
        <OptionScore
          title="Banana"
          score={8.56}
          votes={20}
          color="bg-red-500"
        />
        <OptionScore title="Orange" score={12} votes={54} color="bg-blue-500" />
        <OptionScore
          title="Strawberry"
          score={3.5}
          votes={5}
          color="bg-violet-500"
        />

        <div className="mt-3 mb-1 h-[2px] w-full bg-zinc-800"></div>

        <p className="text-sm font-semibold">Total votes: 279</p>
      </div>
      <div className="w-2/5">
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
  );
};

export default Results;
