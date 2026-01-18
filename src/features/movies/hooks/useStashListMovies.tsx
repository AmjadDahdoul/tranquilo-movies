import { moviesApi } from "@/services/tmdb/movies";
import type { TmdbListDetails } from "@/services/tmdb/types";
import { useQuery } from "@tanstack/react-query";

const STASH_LIST_ID = Number(import.meta.env.VITE_TMDB_STASH_LIST_ID);

export const useStachedMovies = () => {
  return useQuery<TmdbListDetails>({
    queryKey: ["stashed-movies", STASH_LIST_ID],
    queryFn: () => moviesApi.stashedMovies(STASH_LIST_ID),
    enabled: !!STASH_LIST_ID,
  });
};
