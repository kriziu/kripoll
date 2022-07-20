import Answers from './Answers';
import type { PollConfigurationProps } from './Home';

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
        <label className="font-bold" htmlFor="desc">
          Description{' '}
          <span className="font-bold text-zinc-600">(optional)</span>
        </label>
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
      <Answers
        pollConfiguration={pollConfiguration}
        setPollConfiguration={setPollConfiguration}
      />
    </div>
  );
};

export default Inputs;
