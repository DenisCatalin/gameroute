import ms from "ms";

export const formatTimeAgo = (milliseconds: number) => {
  const duration = ms(Date.now() - milliseconds, { long: true });
  return `${duration} ago`;
};
