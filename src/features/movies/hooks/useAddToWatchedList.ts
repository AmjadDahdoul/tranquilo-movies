import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import { ENV } from "@/config/env";
import { ListType } from "@/routes/enum/ListType";
import { ActionType } from "@/routes/enum/ActionType";
import type {
  TmdbListDetails,
  TmdbWatchlistMoviesResponse,
} from "@/services/tmdb/types";
import { saveWatchedTimestamp } from "./watchedTimestamps";

export function useAddToWatchedList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieId: number) => {
      return moviesApi.updateList(ENV.WATCHED_LIST_ID, movieId, ActionType.ADD);
    },

    // Check this later
    onMutate: async (movieId) => {
      await queryClient.cancelQueries({
        queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
      });
      await queryClient.cancelQueries({
        queryKey: [ListType.STASHLIST, ENV.STASH_LIST_ID],
      });

      const previousWatchlist =
        queryClient.getQueryData<TmdbWatchlistMoviesResponse>([
          ListType.WATCHLIST,
          ENV.ACCOUNT_ID,
        ]);
      const previousStashlist = queryClient.getQueryData<TmdbListDetails>([
        ListType.STASHLIST,
        ENV.STASH_LIST_ID,
      ]);

      queryClient.setQueryData<TmdbWatchlistMoviesResponse>(
        [ListType.WATCHLIST, ENV.ACCOUNT_ID],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            results: old.results.filter((m) => m.id !== movieId),
          };
        },
      );

      queryClient.setQueryData<TmdbListDetails>(
        [ListType.STASHLIST, ENV.STASH_LIST_ID],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((m) => m.id !== movieId),
          };
        },
      );

      return { previousWatchlist, previousStashlist };
    },

    onError: (_err, _movieId, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(
          [ListType.WATCHLIST, ENV.ACCOUNT_ID],
          context.previousWatchlist,
        );
      }
      if (context?.previousStashlist) {
        queryClient.setQueryData(
          [ListType.STASHLIST, ENV.STASH_LIST_ID],
          context.previousStashlist,
        );
      }
    },

    onSuccess: (_data, movieId) => {
      saveWatchedTimestamp(movieId);

      moviesApi.updateWatchlist(ENV.ACCOUNT_ID, {
        media_type: "movie",
        media_id: movieId,
        watchlist: false,
      });

      moviesApi.updateList(ENV.STASH_LIST_ID, movieId, ActionType.REMOVE);
    },

    // Check this later
    onSettled: (_data, _err, movieId) => {
      queryClient.invalidateQueries({ queryKey: ["watched-movies"] });
      queryClient.invalidateQueries({ queryKey: ["infinite-watched-movies"] });
      queryClient.invalidateQueries({
        queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [ListType.STASHLIST, ENV.STASH_LIST_ID],
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist-status", movieId],
      });
      queryClient.invalidateQueries({
        queryKey: ["item-status", ENV.STASH_LIST_ID, movieId],
      });
      queryClient.invalidateQueries({ queryKey: ["watchlist-status"] });
      queryClient.invalidateQueries({ queryKey: ["item-status"] });
    },
  });
}
