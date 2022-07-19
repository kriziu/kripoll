import { Dispatch, SetStateAction } from 'react';

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
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        getResults();
      }}
    >
      <label>
        Enter password
        <input
          type="password1"
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
    </form>
  );
};

export default PasswordModal;
