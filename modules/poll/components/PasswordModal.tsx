import { Dispatch, SetStateAction } from 'react';

import { motion } from 'framer-motion';

import {
  bgAnimation,
  modalAnimation,
} from '../animations/PasswordModal.animations';

const PasswordModal = ({
  getResults,
  error,
  password,
  setPassword,
}: {
  getResults: () => void;
  error?: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
      variants={bgAnimation}
      initial="closed"
      animate="opened"
      exit="closed"
    >
      <motion.form
        className="mx-4 w-full max-w-sm rounded-xl bg-zinc-800 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          getResults();
        }}
        variants={modalAnimation}
        initial="closed"
        animate="opened"
        exit="exited"
      >
        <label>
          Enter password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoFocus
          />
        </label>

        {error && (
          <p className="text-sm font-bold text-red-500">Wrong password</p>
        )}

        <button type="submit" className="btn mt-3 h-8 py-0">
          Get Results
        </button>
      </motion.form>
    </motion.div>
  );
};

export default PasswordModal;
