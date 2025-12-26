import Container from "../Container/Container";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "../Providers/ModeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-600 backdrop-blur bg-white/90 dark:bg-gray-950/90">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold dark:text-white">
            <Link>Martivo</Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-black dark:text-white"
                } hover:text-primary`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-black dark:text-white"
                } hover:text-primary`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/product-details"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-black dark:text-white"
                } hover:text-primary`
              }
            >
              Product-Details
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-black dark:text-white"
                } hover:text-primary`
              }
            >
              Crat
            </NavLink>

            {/* Admin Button */}
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-black dark:text-white"
                } hover:text-primary`
              }
            >
              Admin
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-2">
            {/* Mode toggle */}
            <ModeToggle />

            <Button variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex gap-2">
            {/* Mode toggle */}
            <div>
              <ModeToggle />
            </div>
            <div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription className="-mt-5"></SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-3 mt-8 text-md mx-auto">
                    <a href="#" onClick={() => setOpen(false)}>
                      Home
                    </a>
                    <a href="#" onClick={() => setOpen(false)}>
                      Products
                    </a>
                    <a href="#" onClick={() => setOpen(false)}>
                      About
                    </a>
                    <a href="#" onClick={() => setOpen(false)}>
                      Contact
                    </a>
                  </nav>
                  <div className="mt-6 flex flex-col gap-2 mx-4">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                    <Button className="w-full">Sign Up</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
