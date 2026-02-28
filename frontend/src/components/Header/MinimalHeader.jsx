import Container from "../Container/Container";
import { Link } from "react-router";
import { ModeToggle } from "../Providers/ModeToggle";
import logo from "../../assets/logo.png";

export default function MinimalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="w-[150px]">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-full h-full" />
            </Link>
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
