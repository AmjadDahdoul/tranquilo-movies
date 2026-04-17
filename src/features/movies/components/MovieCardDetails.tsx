import { getPosterUrl } from "@/services/tmdb/utils";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useEffect } from "react";
import { X } from "lucide-react";

interface MovieCardDetailsProps {
  movieId: number;
  onClose?: () => void;
}

export function MovieCardDetails({ movieId, onClose }: MovieCardDetailsProps) {
  const { data, isLoading } = useMovieDetails(movieId);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="text-muted-foreground text-sm">Loading…</div>
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

  const showOriginalTitle = original_title && original_title !== title;

  const formattedRuntime = () => {
    if (!runtime) return null;
    const h = Math.floor(runtime / 60);
    const m = runtime % 60;
    return `${h}h ${m}m`;
  };

  const formattedBudget =
    budget && budget > 0 ? `$${budget.toLocaleString()}` : null;
  const formattedRevenue =
    revenue && revenue > 0 ? `$${revenue.toLocaleString()}` : null;
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[88vh] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop strip */}
        <div className="h-40 relative overflow-hidden flex-shrink-0">
          {backdrop_path ? (
            <img
              src={getPosterUrl(backdrop_path, "original")}
              alt={title}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 border border-border text-muted-foreground hover:text-foreground hover:bg-black/80 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        {/* Body — overlaps backdrop by 52px */}
        <div
          className="flex gap-4 px-5 pb-5 overflow-y-auto"
          style={{ marginTop: "-52px" }}
        >
          {/* Poster */}
          {poster_path && (
            <img
              src={getPosterUrl(poster_path, "w300")}
              alt={title}
              className="w-20 aspect-[2/3] rounded-lg border-2 border-border shadow-lg flex-shrink-0 self-start object-cover"
            />
          )}

          {/* Info */}
          <div className="flex flex-col gap-2 min-w-0 flex-1 pt-14">
            <div>
              <h2 className="text-xl font-bold tracking-tight leading-tight">
                {title}
                {showOriginalTitle && (
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">
                    ({original_title})
                  </span>
                )}
              </h2>
              {tagline && (
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {tagline}
                </p>
              )}
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-yellow-400">
                ★ {vote_average.toFixed(1)}
              </span>
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                {vote_count.toLocaleString()} votes
              </span>
              {formattedRuntime() && (
                <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                  {formattedRuntime()}
                </span>
              )}
              {releaseYear && (
                <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                  {releaseYear}
                </span>
              )}
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground uppercase">
                {original_language}
              </span>
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                {status}
              </span>
            </div>

            {/* Genre chips */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] px-2.5 py-0.5"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {overview && (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {overview}
              </p>
            )}

            {/* Financials — compact */}
            {(formattedBudget ||
              formattedRevenue ||
              spoken_languages.length > 0) && (
              <div className="flex flex-wrap gap-4 border-t border-border pt-3">
                {formattedBudget && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Budget
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {formattedBudget}
                    </p>
                  </div>
                )}
                {formattedRevenue && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Revenue
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {formattedRevenue}
                    </p>
                  </div>
                )}
                {spoken_languages.length > 0 && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Languages
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {spoken_languages.map((l) => l.english_name).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
