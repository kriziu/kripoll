import Options from './Options';

const Inputs = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="font-bold" htmlFor="title">
          Title
        </label>
        <input
          className="input"
          type="text"
          placeholder="Enter title..."
          id="title"
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
        />
      </div>

      <Options />
    </div>
  );
};

export default Inputs;
