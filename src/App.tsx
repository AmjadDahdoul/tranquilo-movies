import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieSearch } from "./features/movies/components/MovieSearch";
// import { WatchedList } from "./features/movies/components/WatchedList";
// import { Watchlist } from "./features/movies/components/watchlist";
import { StashedList } from "./features/movies/components/StashedList";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <StashedList />
        <MovieSearch />
        {/* <Watchlist />
        <WatchedList /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
