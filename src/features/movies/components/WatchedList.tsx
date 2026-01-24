import { ListType } from "@/routes/enum/ListType";
import { useWatchedMovies } from "../hooks/useWatchedMovies";
import { MoviesContainer } from "./MoviesContainer";

export const WatchedList = () => {
  const { data, isLoading, isError } = useWatchedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;
  if (!data) return;

  return (
    <MoviesContainer movies={data.items} listType={ListType.WATCHEDLIST} />
  );
};
