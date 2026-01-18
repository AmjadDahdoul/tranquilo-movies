import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbWatchlistMoviesResponse } from "@/services/tmdb/types";
import { ENV } from "@/config/env";

const ACCOUNT_ID = ENV.ACCOUNT_ID;

export const useWatchList = () => {
  return useQuery<TmdbWatchlistMoviesResponse>({
    queryKey: ["watchlist-movies", ACCOUNT_ID],
    queryFn: () => moviesApi.watchList(ACCOUNT_ID),
    enabled: !!ACCOUNT_ID,
  });
};
