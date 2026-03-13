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
import { UserProfileDesktop, UserProfileMobile } from "../Profile/UserProfile";
import logo from "../../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { userData, itemsCount } = useContext(AuthContext);

  const navMenus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="w-[150px]">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-full h-full" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500" : "text-black dark:text-white"
                  } hover:text-primary`
                }
              >
                {menu.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-3">
            {/* Cart */}
            <div className="relative cursor-pointer">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ShoppingCart />
                </Button>
                <div className="absolute -top-1 right-0 bg-primary text-white text-[10px] rounded px-1">
                  {itemsCount > 0 ? itemsCount : null}
                </div>
              </Link>
            </div>
            {/* Mode toggle */}
            <ModeToggle />

            {userData.user ? (
              <UserProfileDesktop user={userData.user} />
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
                <div className="absolute -top-1 right-0 bg-primary text-white text-[10px] rounded px-1">
                  {itemsCount > 0 ? itemsCount : null}
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
                    {navMenus.map((menu) => (
                      <NavLink
                        key={menu.path}
                        to={menu.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "text-blue-500"
                              : "text-black dark:text-white"
                          } hover:text-primary`
                        }
                      >
                        {menu.name}
                      </NavLink>
                    ))}
                  </nav>
                  <SheetFooter>
                    {userData.user ? (
                      <div>
                        <UserProfileMobile user={userData.user} />
                      </div>
                    ) : (
                      <Link to="/auth/login">
                        <Button className="w-full text-white cursor-pointer">
                          Log in
                        </Button>
                      </Link>
                    )}
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
