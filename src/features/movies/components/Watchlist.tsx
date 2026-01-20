import { Container } from "@/components/ui/container";
import { useWatchList } from "../hooks/useWatchList";
import { MovieCard } from "./MovieCard";

export const Watchlist = () => {
  const { data: movies, isLoading, isError } = useWatchList();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-6">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Container>
  );
};
