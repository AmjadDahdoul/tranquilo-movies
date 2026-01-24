import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";

export function useWatchlistStatus(movieId: number) {
  return useQuery({
    queryKey: ["watchlist-status", movieId],
    queryFn: () => moviesApi.getAccountStates(movieId),
    enabled: !!movieId,
  });
}
