import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";
import { ENV } from "@/config/env";
import { ActionType } from "@/routes/enum/ActionType";
import type { TmdbListDetails } from "@/services/tmdb/types";
import { clearWatchedTimestamp } from "./watchedTimestamps";

export function useRemoveFromWatchedList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) =>
      moviesApi.updateList(ENV.WATCHED_LIST_ID, movieId, ActionType.REMOVE),

    onMutate: async (movieId) => {
      await queryClient.cancelQueries({
        queryKey: ["infinite-watched-movies"],
      });
      const previousData = queryClient.getQueryData<
        InfiniteData<TmdbListDetails>
      >(["infinite-watched-movies"]);

      queryClient.setQueryData<InfiniteData<TmdbListDetails>>(
        ["infinite-watched-movies"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.filter((item) => item.id !== movieId),
              total_results: Math.max(0, page.total_results - 1),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _movieId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["infinite-watched-movies"],
          context.previousData,
        );
      }
    },

    onSuccess: (_data, movieId) => {
      clearWatchedTimestamp(movieId);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite-watched-movies"] });
      queryClient.invalidateQueries({ queryKey: ["watched-movies"] });
    },
  });
}
