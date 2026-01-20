import { useWatchedMovies } from "../hooks/useWatchedMovies";
import { MoviesContainer } from "./MoviesContaniner";

export const WatchedList = () => {
  const { data, isLoading, isError } = useWatchedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;
  if (!data) return;

  return (
    // remove border-b
    <div className="border-b-2 border-gray-500 mb-4">
      <MoviesContainer movies={data} />
    </div>
  );
};
