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
import { LogOutIcon, Ellipsis } from "lucide-react";
import { Link } from "react-router";

export function UserProfileDesktop({ user }) {
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
        <DropdownMenuItem variant="destructive" className="cursor-pointer">
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserProfileMobile({ user }) {
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
        <Button variant="destructive" className="w-full">
          <LogOutIcon />
          Log Out
        </Button>
      </Link>
    </div>
  );
}
