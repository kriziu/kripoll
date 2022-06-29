import { Dispatch, SetStateAction, useState } from 'react';

import axios from 'axios';

import Header from './Header';
import Inputs from './Inputs';
import Settings from './Settings';

export interface PollConfigurationProps {
  pollConfiguration: PollConfiguration;
  setPollConfiguration: Dispatch<SetStateAction<PollConfiguration>>;
}

const DEFAULT_POLL_CONFIGURATION: {
  title: string;
  duplicationCheck: 'IP' | 'COOKIE' | 'NONE';
  options: string[];
} = {
  title: '',
  duplicationCheck: 'IP',
  options: ['', ''],
};

const Home = () => {
  const [pollConfiguration, setPollConfiguration] = useState<PollConfiguration>(
    DEFAULT_POLL_CONFIGURATION
  );

  const handleCreatePoll = () => {
    axios
      .post<any, any, PollConfiguration>('/api/create', pollConfiguration)
      .then((res) => {
        console.log(res);
        setPollConfiguration(DEFAULT_POLL_CONFIGURATION);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <div className="sm:w-96 md:w-160">
        <Inputs
          pollConfiguration={pollConfiguration}
          setPollConfiguration={setPollConfiguration}
        />

        <Settings
          pollConfiguration={pollConfiguration}
          setPollConfiguration={setPollConfiguration}
        />

        <button className="btn my-10" onClick={handleCreatePoll}>
          Create poll
        </button>
      </div>
    </div>
  );
};

export default Home;
