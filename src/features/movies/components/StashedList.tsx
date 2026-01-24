import { ListType } from "@/routes/enum/ListType";
import { useStachedMovies } from "../hooks/useStashListMovies";
import { MoviesContainer } from "./MoviesContainer";

export const StashedList = () => {
  const { data, isLoading, isError } = useStachedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  if (!data) return;

  return <MoviesContainer movies={data.items} listType={ListType.STASHLIST} />;
};
