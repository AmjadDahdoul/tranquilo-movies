import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbWatchlistMoviesResponse } from "@/services/tmdb/types";

const ACCOUNT_ID = Number(import.meta.env.VITE_TMDB_ACCOUNT_ID);

export const useWatchList = () => {
  return useQuery<TmdbWatchlistMoviesResponse>({
    queryKey: ["watchlist-movies", ACCOUNT_ID],
    queryFn: () => moviesApi.watchList(ACCOUNT_ID),
    enabled: !!ACCOUNT_ID,
  });
};
