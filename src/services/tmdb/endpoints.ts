export const tmdbEndpoints = {
  search: (query: string) => `/search/movie?query=${encodeURIComponent(query)}`,
  movie: (id: number) => `/movie/${id}`,
  watchedMovies: (listId: number) => `/list/${listId}`,
  watchedMoviesPaginated: (listId: number, page: number) =>
    `/list/${listId}?page=${page}`,
  stashedMovies: (listId: number) => `/list/${listId}`,
  watchList: (accountId: number) =>
    `/account/${accountId}/watchlist/movies?sort_by=created_at.desc`,
  checkItemStatus: (listId: number, movieId: number) =>
    `/list/${listId}/item_status?movie_id=${movieId}`,
  updateWatchlist: (accountId: number) => `/account/${accountId}/watchlist`,
  accountStatus: (movieId: number) => `/movie/${movieId}/account_states'`,
};
