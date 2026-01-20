import { useStachedMovies } from "../hooks/useStashListMovies";
import { MoviesContainer } from "./MoviesContaniner";

export const StashedList = () => {
  const { data, isLoading, isError } = useStachedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  if (!data) return;

  return (
    <div className="border-b-2 border-gray-500 mb-4">
      <MoviesContainer movies={data} />
    </div>
  );
};
