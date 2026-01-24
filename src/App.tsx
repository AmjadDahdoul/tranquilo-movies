import { useSearchParams } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieSearch } from "./features/movies/components/MovieSearch";
import { StashedList } from "./features/movies/components/StashedList";
import { Navbar } from "./layout/Navbar";
import { Watchlist } from "./features/movies/components/Watchlist";
import { Container } from "./components/ui/container";

const queryClient = new QueryClient();

export function App() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const hasSearchQuery = !!searchQuery && searchQuery.trim().length > 0;

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />

        {hasSearchQuery ? (
          <MovieSearch />
        ) : (
          <>
            <Container>
              <div className="my-6">
                <h2 className="text-2xl font-bold mb-4">Your Stash List</h2>
                <StashedList />
              </div>

              <div className="my-6">
                <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
                <Watchlist />
              </div>
            </Container>
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
