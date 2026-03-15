import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { notification } from "@/utils/toast";
import AuthContext from "@/contexts/AuthContext";
import { logout } from "@/services/authService";
import { ModeToggle } from "../Providers/ModeToggle";

const useLogout = () => {
  const { userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      userLogout();

      notification.success("Logged out successfully.");
      navigate("/auth/login");
    } catch (error) {
      notification.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return handleLogout;
};

export function UserProfileDesktop({ user }) {
  const logout = useLogout();

  const getInitials = (name) =>
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
        >
          <Avatar>
            <AvatarImage src={user?.avatar?.url} alt="Avatar" />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="grid justify-items-center gap-2 my-3">
          <p className="text-xs">{user?.name}</p>
          <p className="text-xs">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/user/orders">
            <DropdownMenuItem className="cursor-pointer">
              My Orders
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserProfileMobile({ user }) {
  const logout = useLogout();

  const getInitials = (name) =>
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");

  return (
    <div className="grid gap-3">
      <div className="flex gap-3 place-items-center bg-card rounded-lg px-2">
        <Avatar>
          <AvatarImage src={user?.avatar?.url} alt="Avatar" />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2 my-3">
          <p className="text-sm">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
      <Link to="/user/orders">
        <Button variant="outline" className="w-full">
          My Orders
        </Button>
      </Link>

      <div className="flex gap-3 items-center">
        {/* Theme Mode toggle */}
        <ModeToggle />

        <div className="flex-1">
          <Button variant="destructive" className="w-full" onClick={logout}>
            <LogOutIcon />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
