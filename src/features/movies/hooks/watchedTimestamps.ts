const key = (movieId: number) => `watched_ts_${movieId}`;

export const saveWatchedTimestamp = (movieId: number) =>
  localStorage.setItem(key(movieId), String(Date.now()));

export const canRemoveWatched = (movieId: number): boolean => {
  const ts = localStorage.getItem(key(movieId));
  if (!ts) return false;
  return Date.now() - Number(ts) < 24 * 60 * 60 * 1000;
};

export const clearWatchedTimestamp = (movieId: number) =>
  localStorage.removeItem(key(movieId));
