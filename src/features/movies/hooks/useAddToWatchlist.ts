import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import { ENV } from "@/config/env";
import { ListType } from "@/routes/enum/ListType";

type ToggleWatchlistParams = {
  movieId: number;
  watchlist: boolean;
};

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movieId, watchlist }: ToggleWatchlistParams) =>
      moviesApi.updateWatchlist(ENV.ACCOUNT_ID, {
        media_type: "movie",
        media_id: movieId,
        watchlist,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
      });
    },
  });
}
