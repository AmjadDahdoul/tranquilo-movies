import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesApi, type updateAction } from "@/services/tmdb/movies";

export function useUpdateList(
  listId: number,
  action: updateAction,
  listType?: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) =>
      moviesApi.updateList(listId, movieId, action),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [listType, listId],
      });

      queryClient.invalidateQueries({
        queryKey: ["item-status", listId],
      });

      queryClient.invalidateQueries({
        queryKey: ["watchlist-status"],
      });
    },
  });
}
