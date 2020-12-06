export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const shuffle = (gang) => {
  for (let i = gang.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gang[i], gang[j]] = [gang[j], gang[i]];
  }
  return gang;
};

export const getSorting = (gang) => {
  return gang.sort((a, b) => b - a);
};

