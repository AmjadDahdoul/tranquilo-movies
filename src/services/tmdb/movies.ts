import { tmdbClient } from "./client";
import { tmdbEndpoints } from "./endpoints";
import type {
  Movie,
  MovieListResponse,
  TmdbListDetails,
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

  stashedMovies: (listId: number) =>
    tmdbClient<TmdbListDetails>(tmdbEndpoints.stashedMovies(listId)),

  watchList: (accountId: number) =>
    tmdbClient<TmdbWatchlistMoviesResponse>(tmdbEndpoints.watchList(accountId)),

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
};
