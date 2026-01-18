import { ENV } from "@/config/env";
import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbListDetails } from "@/services/tmdb/types";
import { useQuery } from "@tanstack/react-query";

const WATCHED_LIST_ID = ENV.WATCHED_LIST_ID;

export const useWatchedMovies = () => {
  return useQuery<TmdbListDetails>({
    queryKey: ["watched-movies", WATCHED_LIST_ID],
    queryFn: () => moviesApi.watchedMovies(WATCHED_LIST_ID),
    enabled: !!WATCHED_LIST_ID,
  });
};
