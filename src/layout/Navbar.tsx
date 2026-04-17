import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useRef } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const LINKS = [
  "https://youtu.be/aQkPcPqTq4M?si=hFlYn7SoWjDvb1TE",
  "https://youtu.be/gQtKJbptcns?si=5602Ydu2OeJVP3fi",
  "https://youtu.be/MPlkHxFA-Qg?si=ZtykX4rrnhxsVrAc",
  "https://youtu.be/88sARuFu-tc?si=kNf42iBM3OxHTOih",
  "https://youtu.be/Uj1AOKUPYTY?si=B_ED6bbBklaLHbLk",
  "https://youtu.be/tD5oQQ-CQ4E?si=cN_8JVvPaxAMijhm",
  "https://youtu.be/ho5YyCzRxS8?si=eS5iGoeWQbPZ_V4U",
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

    if (logoClickCount.current % 9 === 0) {
      const randomIndex = Math.floor(Math.random() * LINKS.length);
      window.open(LINKS[randomIndex], "_blank");
      toast("Total logo clicks: " + logoClickCount.current);
    }
  };

  const words = ["Movies", "Bovies", "أفلام", "Filme"];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <Container>
          <div className="flex h-14 items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={handleLogoClick}
            >
              <img
                src="/TRNQL.gif"
                alt="Tranquilo"
                className="h-9 w-9 rounded-lg active:scale-125 duration-200 ease-in-out"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-mono font-semibold text-xs tracking-widest uppercase text-primary leading-none select-none">
                  Tranquilo
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight select-none">
                  <LayoutTextFlip text="Movies" words={words} duration={2500} />
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-auto">
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  placeholder="Search movies…"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchParams({}, { replace: true })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Toaster position="top-right" richColors duration={3000} />
    </>
  );
};
