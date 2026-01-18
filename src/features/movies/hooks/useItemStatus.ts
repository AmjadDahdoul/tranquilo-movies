import { moviesApi } from "@/services/tmdb/movies";
import { useQuery } from "@tanstack/react-query";

export function useItemStatus(listId: number, movieId: number) {
  return useQuery({
    queryKey: ["item-status", listId, movieId],

    queryFn: () => moviesApi.checkMovieStatus(listId, movieId),

    enabled: !!listId && !!movieId,
  });
}
