import { FormEvent, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Loader from '@/common/components/Loader';

const JoinPin = () => {
  const [pin, setPin] = useState('');

  const router = useRouter();

  const pinCodeMutate = useMutation(
    () => axios.get<{ id: string }>(`/api/pin?pin=${pin}`),
    {
      retry: false,
      onSuccess: (res) => {
        router.push(`/${res.data.id}`);
      },
      onError: () => {
        toast.error('Invalid pin code');
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pin.length < 6) {
      toast.error('Pin code must be at least 6 characters long');
      return;
    }

    pinCodeMutate.mutate();
  };

  return (
    <>
      {pinCodeMutate.status === 'loading' && <Loader />}
      <form className="mb-7 w-64" onSubmit={handleSubmit}>
        <label>
          <p className="text-center text-lg font-semibold">
            Search by PIN Code
          </p>
          <input
            type="text"
            className="input text-center"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN Code"
          />
        </label>
        <button className="btn mt-2 h-8 py-0">Search</button>
      </form>
    </>
  );
};

export default JoinPin;
