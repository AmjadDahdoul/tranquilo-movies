import { useSearchParams } from "react-router-dom";
import { Search, X, Film } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRef } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

const LINKS = [
  "https://youtu.be/aQkPcPqTq4M?si=hFlYn7SoWjDvb1TE", // MACINTOSH PLUS - リサフランク420 / 現代のコンピュ
  "https://youtu.be/gQtKJbptcns?si=5602Ydu2OeJVP3fi", // Rapp Snitch Knishes
  "https://youtu.be/MPlkHxFA-Qg?si=ZtykX4rrnhxsVrAc", // Ludovico Einaudi – Una Mattina
  "https://youtu.be/88sARuFu-tc?si=kNf42iBM3OxHTOih", // Bronski Beat - Smalltown Boy
  "https://youtu.be/Uj1AOKUPYTY?si=B_ED6bbBklaLHbLk", //Angus and Julia Stone - I'm Not Yours
  "https://youtu.be/tD5oQQ-CQ4E?si=cN_8JVvPaxAMijhm", // Hailie's Song · Eminem
] as const;

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

  const logoClickCount = useRef<number>(
    Number(localStorage.getItem("logoClickCount")) || 0,
  );

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    localStorage.setItem("logoClickCount", logoClickCount.current.toString());

    if (logoClickCount.current % 5 === 0) {
      const randomIndex = Math.floor(Math.random() * LINKS.length);
      window.open(LINKS[randomIndex], "_blank");
    }
  };

  const words = ["Movies", "Bovies", "أفلام", "Filme"];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Film
              className="h-6 w-6 text-primary active:scale-125 duration-200 ease-in-out hover:animate-spin"
              onClick={handleLogoClick}
            />
            <span className="hidden sm:block select-none hover:animate-pulse">
              <LayoutTextFlip text="Tranquilo" words={words} duration={2500} />
            </span>
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
