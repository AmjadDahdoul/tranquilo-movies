import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import { ENV } from "@/config/env";
import { ListType } from "@/routes/enum/ListType";
import { ActionType } from "@/routes/enum/ActionType";

export function useAddToWatchedList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieId: number) => {
      return moviesApi.updateList(ENV.WATCHED_LIST_ID, movieId, ActionType.ADD);
    },

    onSuccess: (_, movieId) => {
      moviesApi.updateWatchlist(ENV.ACCOUNT_ID, {
        media_type: "movie",
        media_id: movieId,
        watchlist: false,
      });

      moviesApi.updateList(ENV.STASH_LIST_ID, movieId, ActionType.REMOVE);

      queryClient.invalidateQueries({
        queryKey: ["watched-movies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infinite-watched-movies"],
      });
      queryClient.invalidateQueries({
        queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [ListType.STASHLIST, ENV.STASH_LIST_ID],
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist-status"],
      });
      queryClient.invalidateQueries({
        queryKey: ["item-status"],
      });
    },
  });
}
