import Spinner from './Spinner';

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/30">
      <Spinner large />
    </div>
  );
};

export default Loader;
