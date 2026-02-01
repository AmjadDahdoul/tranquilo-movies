import { tmdbClient } from "./client";
import { tmdbEndpoints } from "./endpoints";
import type {
  Movie,
  MovieListResponse,
  TmdbAccountStatesResponse,
  TmdbAddToWatchlistBody,
  TmdbAddToWatchlistResponse,
  TmdbItemStatusResponse,
  TmdbListDetails,
  TmdbMovieDetails,
  TmdbWatchlistMoviesResponse,
} from "./types";

export type updateAction = "add_item" | "remove_item";

export const moviesApi = {
  getById: (id: number) => tmdbClient<Movie>(tmdbEndpoints.movie(id)),

  search: (query: string) => {
    if (!query.trim()) {
      return Promise.resolve({
        page: 1,
        results: [],
        total_pages: 1,
      } as MovieListResponse);
    }

    return tmdbClient<MovieListResponse>(tmdbEndpoints.search(query));
  },

  watchedMovies: (listId: number) =>
    tmdbClient<TmdbListDetails>(tmdbEndpoints.watchedMovies(listId)),

  watchedMoviesPaginated: (listId: number, page: number = 1) =>
    tmdbClient<TmdbListDetails>(
      tmdbEndpoints.watchedMoviesPaginated(listId, page),
    ),

  stashedMovies: (listId: number) =>
    tmdbClient<TmdbListDetails>(tmdbEndpoints.stashedMovies(listId)),

  watchList: (accountId: number) =>
    tmdbClient<TmdbWatchlistMoviesResponse>(tmdbEndpoints.watchList(accountId)),

  updateWatchlist: (accountId: number, body: TmdbAddToWatchlistBody) =>
    tmdbClient<TmdbAddToWatchlistResponse>(
      tmdbEndpoints.updateWatchlist(accountId),
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    ),

  updateList: (listId: number, movieId: number, action: updateAction) =>
    tmdbClient<{ status_code: number; status_message: string }>(
      `/list/${listId}/${action}`,
      {
        method: "POST",
        body: JSON.stringify({
          media_id: movieId,
        }),
      },
    ),

  checkMovieStatus: (listId: number, movieId: number) =>
    tmdbClient<TmdbItemStatusResponse>(
      tmdbEndpoints.checkItemStatus(listId, movieId),
    ),

  getAccountStates: (movieId: number) =>
    tmdbClient<TmdbAccountStatesResponse>(`/movie/${movieId}/account_states`),

  getMovieDetails: (movieId: number) =>
    tmdbClient<TmdbMovieDetails>(tmdbEndpoints.movieDetails(movieId)),
};
