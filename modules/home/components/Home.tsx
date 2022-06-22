import Header from './Header';
import Inputs from './Inputs';
import Settings from './Settings';

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <div className="sm:w-96 md:w-160">
        <Inputs />

        <Settings />

        <button className="btn my-10">Create poll</button>
      </div>
    </div>
  );
};

export default Home;
