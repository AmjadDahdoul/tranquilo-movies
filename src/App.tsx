import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieSearch } from "./features/movies/components/MovieSearch";
import { WatchedList } from "./features/movies/components/WatchedList";
import { Watchlist } from "./features/movies/components/watchlist";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Watchlist />
        <MovieSearch />
        <WatchedList />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
