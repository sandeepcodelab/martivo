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
import axios from "axios";
import AuthContext from "@/contexts/AuthContext";

const useLogout = () => {
  const { userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("/api/v1/auth/logout")
      .then((res) => {
        userLogout();

        notification.success("Log out successfully.");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        notification.error("Something went wrong, Please try again later.");
      });
  };

  return logout;
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
          <Link to="/user/account">
            <DropdownMenuItem className="cursor-pointer">
              My Account
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
      <Link to="/user/account">
        <Button variant="outline" className="w-full">
          My Account
        </Button>
      </Link>
      <Link>
        <Button variant="destructive" className="w-full" onClick={logout}>
          <LogOutIcon />
          Log Out
        </Button>
      </Link>
    </div>
  );
}
