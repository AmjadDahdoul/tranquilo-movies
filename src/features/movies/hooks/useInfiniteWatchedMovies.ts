import { ENV } from "@/config/env";
import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbListDetails } from "@/services/tmdb/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const WATCHED_LIST_ID = ENV.WATCHED_LIST_ID;

export const useInfiniteWatchedMovies = () => {
  return useInfiniteQuery<TmdbListDetails, Error>({
    queryKey: ["infinite-watched-movies", WATCHED_LIST_ID],
    queryFn: ({ pageParam }) =>
      moviesApi.watchedMoviesPaginated(WATCHED_LIST_ID, pageParam as number),
    enabled: !!WATCHED_LIST_ID,
    getNextPageParam: (lastPage: TmdbListDetails) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
