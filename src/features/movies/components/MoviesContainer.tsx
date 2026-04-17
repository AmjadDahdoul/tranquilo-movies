import type {
  Movie,
  TmdbListItem,
  TmdbWatchlistMovie,
} from "@/services/tmdb/types";
import { MovieCard } from "./MovieCard";
import { Container } from "@/components/ui/container";

interface MoviesContainerProps {
  movies: TmdbListItem[] | TmdbWatchlistMovie[] | Movie[];
  listType?: string;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;
}

export const MoviesContainer = (props: MoviesContainerProps) => {
  const { movies, listType, selectedIds, onToggleSelect } = props;

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 my-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            listType={listType}
            isSelected={selectedIds?.has(movie.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
    </Container>
  );
};
