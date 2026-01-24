import Container from "../Container/Container";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "../Providers/ModeToggle";
import AuthContext from "@/contexts/AuthContext";
import UserProfile from "../Profile/UserProfile";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg">
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
          <div className="hidden md:flex gap-3">
            {/* Cart */}
            <div className="relative cursor-pointer">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ShoppingCart />
                </Button>
                <div className="absolute -top-1 -right-1 bg-primary text-[10px] rounded px-1">
                  10
                </div>
              </Link>
            </div>
            {/* Mode toggle */}
            <ModeToggle />

            {Object.keys(user).length > 0 ? (
              <UserProfile user={user} />
            ) : (
              <Link to="/auth/login">
                <Button className="text-white cursor-pointer">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex gap-2">
            {/* Cart */}
            <div className="relative cursor-pointer">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ShoppingCart />
                </Button>
                <div className="absolute -top-1 -right-1 bg-primary text-[10px] rounded px-1">
                  10
                </div>
              </Link>
            </div>

            {/* Mode toggle */}
            <div>
              <ModeToggle />
            </div>

            {/* Menu */}
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
                    <NavLink
                      to="/"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-blue-500"
                            : "text-black dark:text-white"
                        } hover:text-primary`
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/products"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-blue-500"
                            : "text-black dark:text-white"
                        } hover:text-primary`
                      }
                    >
                      Products
                    </NavLink>
                    <NavLink
                      to="/product-details"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-blue-500"
                            : "text-black dark:text-white"
                        } hover:text-primary`
                      }
                    >
                      Product-Details
                    </NavLink>
                  </nav>
                  <SheetFooter>
                    <Link to="/auth/login">
                      <Button className="text-white w-full cursor-pointer">
                        Login
                      </Button>
                    </Link>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
