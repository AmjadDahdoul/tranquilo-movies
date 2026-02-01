import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbMovieDetails } from "@/services/tmdb/types";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = (movieId: number) => {
  return useQuery<TmdbMovieDetails>({
    queryKey: ["movie-details", movieId],
    queryFn: () => moviesApi.getMovieDetails(movieId),
    enabled: !!movieId,
  });
};
