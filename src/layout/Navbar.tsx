import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="border-b-2 border-gray-100 rounded-3xl">
      <Container>
        <div className="flex justify-between items-center">
          <div className="h-14 flex items-center">Movie App</div>
          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};
