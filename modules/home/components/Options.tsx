const Options = () => {
  return (
    <div>
      <p className="font-bold">Options</p>
      <div className="flex flex-col gap-3">
        <input className="input" type="text" placeholder="Option 1" id="desc" />
        <input
          className="input"
          type="text"
          placeholder="Start typing to add new option"
          id="desc"
        />
        <input className="input" type="text" placeholder="ekh" id="desc" />
        <button className="btn-text self-end">Allow &quot;other&quot;</button>
      </div>
    </div>
  );
};

export default Options;
