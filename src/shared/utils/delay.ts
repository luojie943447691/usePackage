export const delay = (time: number = 1000): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
