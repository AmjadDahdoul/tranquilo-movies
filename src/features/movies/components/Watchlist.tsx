import { useState } from "react";
import { BarChart2, ChevronDown, Loader2, X } from "lucide-react";
import { useWatchList } from "../hooks/useWatchList";
import { ListType } from "@/routes/enum/ListType";
import { MoviesContainer } from "./MoviesContainer";
import { ENV } from "@/config/env";
import { toast } from "sonner";

const DURATION_OPTIONS = [
  { label: "1 hour", value: 1 },
  { label: "4 hours", value: 4 },
  { label: "12 hours", value: 12 },
  { label: "24 hours", value: 24 },
  { label: "2 days", value: 48 },
  { label: "3 days", value: 72 },
  { label: "1 week", value: 168 },
];

export const Watchlist = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("watchlist-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);
  const [duration, setDuration] = useState(1);
  const [question, setQuestion] = useState("");

  const { data: movies, isLoading, isError } = useWatchList();

  const handleCollapseToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("watchlist-collapsed", JSON.stringify(next));
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 10) next.add(id);
      return next;
    });
  };

  const handleExitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
    setDuration(1);
    setQuestion("");
  };

  const handleCreatePoll = async () => {
    if (!ENV.POLL_PROXY_URL) {
      toast.error("Poll proxy not configured — see poll-proxy/README.md");
      return;
    }
    const selectedMovies = movies!.results
      .filter((m) => selectedIds.has(m.id))
      .map((m) => m.title);

    try {
      setIsCreatingPoll(true);
      const res = await fetch(ENV.POLL_PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movies: selectedMovies,
          duration,
          question: question.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Poll posted to Discord!");
      handleExitSelectMode();
    } catch {
      toast.error("Failed to create poll. Check proxy config.");
    } finally {
      setIsCreatingPoll(false);
    }
  };

  if (isLoading)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
        </div>
        <p className="text-muted-foreground text-sm py-6 text-center">
          Loading…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
        </div>
        <p className="text-destructive text-sm py-6 text-center">
          Error loading watchlist.
        </p>
      </div>
    );

  if (!movies) return null;

  const movieCount = movies.results.length;

  return (
    <div className="my-7">
      <div className="flex items-center justify-between w-full mb-4">
        <div
          className="flex items-center gap-2.5 cursor-pointer flex-1"
          onClick={handleCollapseToggle}
        >
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
          <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
            {movieCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {movieCount > 1 && !isSelectMode && !isCollapsed && (
            <button
              type="button"
              onClick={() => setIsSelectMode(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary border border-primary/40 rounded-full px-2.5 py-1 hover:bg-primary/10 transition-colors"
            >
              <BarChart2 className="h-3 w-3" />
              Create Discord Poll
            </button>
          )}
          {isSelectMode && (
            <button
              type="button"
              aria-label="Cancel selection"
              onClick={handleExitSelectMode}
              className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <ChevronDown
            onClick={handleCollapseToggle}
            className={`h-4 w-4 text-muted-foreground cursor-pointer transition-transform duration-200 hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
          />
        </div>
      </div>

      {isSelectMode && !isCollapsed && (
        <div className="flex flex-col mb-4 px-1 gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Bovie? (poll question)"
            maxLength={300}
            className="w-full text-xs bg-card border border-border rounded-full px-3 py-1.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground shrink-0">
              {selectedIds.size === 0
                ? "Tap movies to select (2–10)"
                : `${selectedIds.size} selected`}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Open for:
              </span>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="text-xs bg-card border border-border rounded-full px-2.5 py-1 text-muted-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {selectedIds.size >= 2 && (
                <button
                  type="button"
                  onClick={handleCreatePoll}
                  disabled={isCreatingPoll}
                  className="flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isCreatingPoll ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <BarChart2 className="h-3 w-3" />
                  )}
                  Post Poll ({selectedIds.size})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div>
          {movieCount === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Watchlist is empty.
            </p>
          ) : (
            <>
              <MoviesContainer
                movies={movies.results}
                listType={ListType.WATCHLIST}
                selectedIds={isSelectMode ? selectedIds : undefined}
                onToggleSelect={isSelectMode ? handleToggleSelect : undefined}
              />
              <div className="border-b border-border mt-2" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
