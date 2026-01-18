import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "@/services/tmdb/movies";

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["movie-search", query],
    queryFn: () => moviesApi.search(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    retry: 1,
  });
}
