import { Dispatch, SetStateAction, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Spinner from '@/common/components/Spinner';

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
  const [loading, setLoading] = useState(false);
  const [pollConfiguration, setPollConfiguration] = useState<PollConfiguration>(
    DEFAULT_POLL_CONFIGURATION
  );

  const router = useRouter();

  const handleCreatePoll = () => {
    const { title, options } = pollConfiguration;
    let block = !title;
    options.forEach((option) => {
      if (!option) block = true;
    });

    if (block) return;

    setLoading(true);
    axios
      .post<any, { data: { id: string } }, PollConfiguration>(
        '/api/create',
        pollConfiguration
      )
      .then((res) => {
        setLoading(false);
        router.push(`/${res.data.id}`);
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

        <button
          className="btn my-10 flex items-center justify-center"
          onClick={handleCreatePoll}
        >
          {loading ? <Spinner /> : 'Create poll'}
        </button>
      </div>
    </div>
  );
};

export default Home;
