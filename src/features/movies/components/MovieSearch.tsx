import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { MoviesContainer } from "./MoviesContainer";
import { Container } from "@/components/ui/container";

export function MovieSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const debounced = useDebouncedValue(query);

  const { data, isLoading, isError } = useSearchMovies(debounced);

  if (!query.trim()) {
    return null;
  }

  return (
    <Container>
      <div className="space-y-4 my-6">
        <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Searching for movies...
            </p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              Error while searching. Please try again.
            </p>
          </div>
        )}

        {data && data.results.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No movies found for "{query}".
            </p>
          </div>
        )}

        {data && data.results.length > 0 && (
          <MoviesContainer movies={data.results} />
        )}
      </div>
    </Container>
  );
}
