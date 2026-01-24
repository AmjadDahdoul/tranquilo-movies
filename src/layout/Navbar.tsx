import { useSearchParams } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="border-b-2 border-gray-100 rounded-3xl">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="h-14 flex items-center font-bold text-xl">
            Tranquilo Movies
          </div>
          <div className="flex-1 max-w-md">
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};
