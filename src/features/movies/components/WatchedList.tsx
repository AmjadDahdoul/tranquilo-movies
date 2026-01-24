import { ListType } from "@/routes/enum/ListType";
import { useWatchedMovies } from "../hooks/useWatchedMovies";
import { MoviesContainer } from "./MoviesContainer";

export const WatchedList = () => {
  const { data, isLoading, isError } = useWatchedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;
  if (!data) return;

  return (
    // remove border-b
    <div className="border-b-2 border-gray-500 mb-4">
      <MoviesContainer movies={data.items} listType={ListType.WATCHLIST} />
    </div>
  );
};
