const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  let previousValue = -1;

  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    if (previousValue !== result) {
      previousValue = result;
      return result;
    }
    return result === upper ? lower : result + 1;
  };
};

export {getRandomInteger};
