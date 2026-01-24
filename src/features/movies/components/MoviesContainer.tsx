import type { Movie, TmdbListItem } from "@/services/tmdb/types";
import { MovieCard } from "./MovieCard";
import { Container } from "@/components/ui/container";
import { ListType } from "@/routes/enum/ListType";

interface MoviesContainerProps {
  movies: TmdbListItem[] | Movie[];
  listType?: string;
}

export const MoviesContainer = (props: MoviesContainerProps) => {
  const { movies } = props;

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            listType={ListType.WATCHLIST}
          />
        ))}
      </div>
    </Container>
  );
};
