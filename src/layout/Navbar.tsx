import { useSearchParams } from "react-router-dom";
import { Search, X, Film } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value }, { replace: true });
    } else {
      setSearchParams({});
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Film className="h-6 w-6 text-primary" />
            <span className="hidden sm:block">Tranquilo Movies</span>
          </div>

          <div className="relative flex-1 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="w-full rounded-xl border bg-background px-10 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search movies"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchParams({}, { replace: true })}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};
