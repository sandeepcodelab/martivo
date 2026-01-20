import Container from "../Container/Container";
import { Link } from "react-router";
import { ModeToggle } from "../Providers/ModeToggle";

export default function MinimalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold dark:text-white">
            <Link>Martivo</Link>
          </div>

          <Link to="/">Back to home</Link>

          {/* Mode toggle */}
          <div>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
