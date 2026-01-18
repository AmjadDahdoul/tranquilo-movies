import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { UpdateMovieButton } from "./UpdateMovieButton";

export function MovieSearch() {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query);

  const { data, isLoading, isError } = useSearchMovies(debounced);

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.results.map((movie) => (
          <div key={movie.id} className="space-y-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />

            <p className="font-medium">{movie.title}</p>

            <p className="text-sm opacity-70">{movie.release_date}</p>
            <UpdateMovieButton
              movieId={movie.id}
              action="add_item"
              lable="Add to List"
            />
            <UpdateMovieButton
              movieId={movie.id}
              action="remove_item"
              lable="Remove from List"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
