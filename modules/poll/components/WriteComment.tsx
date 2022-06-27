const WriteComment = () => {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <div>
        <label htmlFor="name">Your name:</label>
        <input type="text" className="input" id="name" />
      </div>

      <div>
        <label htmlFor="name">Comment:</label>
        <textarea className="input" id="name" />
      </div>

      <button className="btn w-full self-end sm:w-1/3">Comment</button>
    </div>
  );
};

export default WriteComment;
