import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieSearch } from "./features/movies/components/MovieSearch";
// import { WatchedList } from "./features/movies/components/WatchedList";
import { StashedList } from "./features/movies/components/StashedList";
import { Navbar } from "./layout/Navbar";
import { Watchlist } from "./features/movies/components/Watchlist";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <StashedList />
        <Watchlist />
        <MovieSearch />
        {/* <WatchedList /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
