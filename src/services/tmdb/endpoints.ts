export const tmdbEndpoints = {
  search: (query: string) => `/search/movie?query=${encodeURIComponent(query)}`,
  movie: (id: number) => `/movie/${id}`,
  watchedMovies: (listId: number) => `/list/${listId}`,
  stashedMovies: (listId: number) => `/list/${listId}`,
  watchList: (accountId: number) => `/account/${accountId}/watchlist/movies`,
};
