export const getPollsVoted = () => {
  const pollsVoted = localStorage.getItem('pollsVoted');
  const pollsVotedArr: string[] = pollsVoted ? JSON.parse(pollsVoted) : [];

  return pollsVotedArr;
};

export const addPollVoted = (pollId: string) => {
  const pollsVoted = getPollsVoted();
  pollsVoted.push(pollId);
  localStorage.setItem('pollsVoted', JSON.stringify(pollsVoted));
};

export const isPollVoted = (pollId: string) => {
  const pollsVoted = getPollsVoted();
  return pollsVoted.includes(pollId);
};
