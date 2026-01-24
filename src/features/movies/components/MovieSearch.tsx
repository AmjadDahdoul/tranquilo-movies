import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { MoviesContainer } from "./MoviesContainer";

export function MovieSearch() {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query);

  const { data, isLoading, isError } = useSearchMovies(debounced);

  if (!data) return;

  return (
    <div className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p>Searching...</p>}
      {isError && <p>Error while searching</p>}

      <MoviesContainer movies={data?.results} />
    </div>
  );
}
