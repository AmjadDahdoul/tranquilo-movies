import type { TmdbListDetails } from "@/services/tmdb/types";
import { MovieCard } from "./MovieCard";
import { Container } from "@/components/ui/container";

interface MoviesContainerProps {
  movies: TmdbListDetails;
}

export const MoviesContainer = (props: MoviesContainerProps) => {
  const { movies } = props;

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-6">
        {movies?.items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Container>
  );
};
