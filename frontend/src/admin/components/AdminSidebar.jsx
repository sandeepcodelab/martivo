"use client";

import * as React from "react";
import {
  Store,
  Package,
  ShoppingBag,
  LayoutGrid,
  UserRound,
} from "lucide-react";

import { MainMenu } from "./MainMenu";
import { SidebarUser } from "./SidebarUser";
import { SidebarHeaderTitle } from "./SidebarHeaderTitle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data
const data = {
  headerData: {
    name: "Martivo",
    logo: Store,
  },
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  dropdowns: [
    {
      title: "Products",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        { title: "All Products", url: "#" },
        { title: "Add Product", url: "#" },
        { title: "Edit Product", url: "#" },
      ],
    },
  ],
  menus: [
    { name: "Orders", url: "#", icon: ShoppingBag },
    { name: "Categories", url: "#", icon: LayoutGrid },
    { name: "Users", url: "#", icon: UserRound },
  ],
};

export function AdminSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderTitle headerData={data.headerData} />
      </SidebarHeader>

      <SidebarContent>
        <MainMenu dropdowns={data.dropdowns} menus={data.menus} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
