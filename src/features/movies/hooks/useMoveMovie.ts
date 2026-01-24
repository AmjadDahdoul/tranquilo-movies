import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import { ENV } from "@/config/env";
import { ListType } from "@/routes/enum/ListType";
import { ActionType } from "@/routes/enum/ActionType";

export const useMoveMovie = () => {
  const queryClient = useQueryClient();

  const moveToWatchlist = useCallback(
    async (movieId: number, isInStashList: boolean) => {
      try {
        await moviesApi.updateWatchlist(ENV.ACCOUNT_ID, {
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        });

        if (isInStashList) {
          await moviesApi.updateList(
            ENV.STASH_LIST_ID,
            movieId,
            ActionType.REMOVE,
          );
        }

        queryClient.invalidateQueries({
          queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
        });
        queryClient.invalidateQueries({
          queryKey: [ListType.STASHLIST, ENV.STASH_LIST_ID],
        });
        queryClient.invalidateQueries({ queryKey: ["watchlist-status"] });
        queryClient.invalidateQueries({
          queryKey: ["item-status", ENV.STASH_LIST_ID],
        });
      } catch (error) {
        console.error("Error moving to watchlist:", error);
        throw error;
      }
    },
    [queryClient],
  );

  const moveToStashList = useCallback(
    async (movieId: number) => {
      try {
        await moviesApi.updateWatchlist(ENV.ACCOUNT_ID, {
          media_type: "movie",
          media_id: movieId,
          watchlist: false,
        });

        await moviesApi.updateList(ENV.STASH_LIST_ID, movieId, ActionType.ADD);

        queryClient.invalidateQueries({
          queryKey: [ListType.WATCHLIST, ENV.ACCOUNT_ID],
        });
        queryClient.invalidateQueries({
          queryKey: [ListType.STASHLIST, ENV.STASH_LIST_ID],
        });
        queryClient.invalidateQueries({ queryKey: ["watchlist-status"] });
        queryClient.invalidateQueries({
          queryKey: ["item-status", ENV.STASH_LIST_ID],
        });
      } catch (error) {
        console.error("Error moving to stash list:", error);
        throw error;
      }
    },
    [queryClient],
  );

  return {
    moveToWatchlist,
    moveToStashList,
  };
};
