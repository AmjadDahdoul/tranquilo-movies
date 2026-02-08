import { getPosterUrl } from "@/services/tmdb/utils";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useEffect } from "react";

interface MovieCardDetailsProps {
  movieId: number;
  onClose?: () => void;
}

export function MovieCardDetails({ movieId, onClose }: MovieCardDetailsProps) {
  const { data, isLoading } = useMovieDetails(movieId);

  // prevent scroll when modal is open -- TODO: check if there is a better way to do this
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="text-white text-lg">Loading…</div>
      </div>
    );
  }

  if (!data) return null;

  const {
    backdrop_path,
    poster_path,
    title,
    original_title,
    overview,
    vote_average,
    vote_count,
    runtime,
    release_date,
    genres,
    tagline,
    status,
    spoken_languages,
    original_language,
    budget,
    revenue,
  } = data;

  const formattedRunTime = () => {
    if (!runtime) return null;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const showOriginalTitle = original_title && original_title !== title;

  const formattedBudget =
    budget && budget > 0 ? `$${budget.toLocaleString()}` : null;

  const formattedRevenue =
    revenue && revenue > 0 ? `$${revenue.toLocaleString()}` : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden rounded-3xl border border-accent bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {backdrop_path && (
          <div className="relative h-96 w-full">
            <img
              src={getPosterUrl(backdrop_path, "original")}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
          </div>
        )}

        <div className="flex gap-6 p-6 overflow-y-auto max-h-[calc(85vh-14rem)]">
          {poster_path && (
            <img
              src={getPosterUrl(poster_path, "w500")}
              alt={title}
              className="hidden sm:block w-48 rounded-xl object-cover shadow-lg"
            />
          )}

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold">
                {title}{" "}
                {showOriginalTitle && (
                  <span className="text-sm text-muted-foreground">
                    ({original_title})
                  </span>
                )}
              </h2>

              {tagline && (
                <p className="italic text-muted-foreground mt-1">{tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>
                ⭐ {vote_average.toFixed(1)} ({vote_count.toLocaleString()})
              </span>
              <span>{formattedRunTime()}</span>
              <span>{new Date(release_date).getFullYear()}</span>
              <span className="uppercase">{original_language}</span>
              <span>{status}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="leading-relaxed text-sm">{overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 text-xs text-muted-foreground pt-4">
              {formattedBudget && (
                <div className="gap-2 flex flex-col">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Budget
                    </h4>
                    <p>{formattedBudget}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Revenue
                    </h4>
                    <p>{formattedRevenue}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Languages
                </h4>
                <p>{spoken_languages.map((l) => l.english_name).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-black/60 p-3 text-white hover:bg-black cursor-pointer hover:scale-110 duration-300 ease-in-out border-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
