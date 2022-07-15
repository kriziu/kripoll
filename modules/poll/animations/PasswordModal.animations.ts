const transition = { ease: [0.6, 0.01, -0.05, 0.9] };

export const bgAnimation = {
  closed: { opacity: 0, transition },
  opened: { opacity: 1, transition },
};

export const modalAnimation = {
  closed: { y: -100, transition },
  opened: { y: 0, transition },
  exited: { y: 100, transition },
};
