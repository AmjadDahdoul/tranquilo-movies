import { useWatchList } from "../hooks/useWatchList";
import { ListType } from "@/routes/enum/ListType";
import { MoviesContainer } from "./MoviesContainer";

export const Watchlist = () => {
  const { data: movies, isLoading, isError } = useWatchList();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  if (!movies) return;

  return (
    <MoviesContainer movies={movies.results} listType={ListType.WATCHLIST} />
  );
};
