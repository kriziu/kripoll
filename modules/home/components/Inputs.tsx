import type { PollConfigurationProps } from './Home';
import Options from './Options';

const Inputs = ({
  pollConfiguration,
  setPollConfiguration,
}: PollConfigurationProps) => {
  return (
    <div className="mb-4 flex flex-col gap-5">
      <div>
        <label className="font-bold" htmlFor="title">
          Title
        </label>
        <input
          className="input"
          type="text"
          placeholder="Enter title..."
          id="title"
          value={pollConfiguration.title}
          onChange={(e) =>
            setPollConfiguration({
              ...pollConfiguration,
              title: e.target.value,
            })
          }
        />
      </div>
      <div>
        <div className="flex w-full justify-between">
          <label className="font-bold" htmlFor="desc">
            Description{' '}
            <span className="font-bold text-zinc-600">(optional)</span>
          </label>
          <button className="btn-text">Image</button>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Enter description..."
          id="desc"
          value={pollConfiguration.description}
          onChange={(e) =>
            setPollConfiguration({
              ...pollConfiguration,
              description: e.target.value,
            })
          }
        />
      </div>
      <Options
        pollConfiguration={pollConfiguration}
        setPollConfiguration={setPollConfiguration}
      />
    </div>
  );
};

export default Inputs;
