import { getPosterUrl } from "@/services/tmdb/utils";
import { useWatchedMovies } from "../hooks/useWatchedMovies";

export const WatchedList = () => {
  const { data, isLoading, isError } = useWatchedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.items.map((movie) => (
        <div key={movie.id}>
          <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
        </div>
      ))}
    </div>
  );
};
