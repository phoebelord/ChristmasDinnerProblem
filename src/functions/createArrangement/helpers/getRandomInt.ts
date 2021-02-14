export const deps = {
  random: Math.random,
};

export const getRandomInt = (n: number): number => {
  return Math.floor(deps.random() * n);
};
