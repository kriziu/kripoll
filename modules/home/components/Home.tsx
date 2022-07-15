import { Dispatch, SetStateAction, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

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
  answers: string[];
} = {
  title: '',
  duplicationCheck: 'IP',
  answers: ['', ''],
};

const Home = () => {
  const [pollConfiguration, setPollConfiguration] = useState<PollConfiguration>(
    DEFAULT_POLL_CONFIGURATION
  );

  const router = useRouter();

  const createMutation = useMutation(
    () =>
      axios.post<any, { data: { id: string } }, PollConfiguration>(
        '/api/create',
        pollConfiguration
      ),
    {
      onSuccess: (res) => {
        router.push(`//${res.data.id}`);
        setPollConfiguration(DEFAULT_POLL_CONFIGURATION);
      },
    }
  );

  const { title, answers } = pollConfiguration;
  let block = !title;
  answers.forEach((answer) => {
    if (!answer) block = true;
  });

  const handleCreatePoll = () => {
    if (!block) createMutation.mutate();
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <div className="w-full px-6 sm:w-96 sm:px-0 md:w-160">
        <Inputs
          pollConfiguration={pollConfiguration}
          setPollConfiguration={setPollConfiguration}
        />

        <Settings
          pollConfiguration={pollConfiguration}
          setPollConfiguration={setPollConfiguration}
        />

        <button
          className="btn mt-5 mb-10 flex items-center justify-center"
          onClick={handleCreatePoll}
          disabled={block}
        >
          {createMutation.isLoading ? <Spinner /> : 'Create poll'}
        </button>
      </div>
    </div>
  );
};

export default Home;
