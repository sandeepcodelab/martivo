import * as React from "react";
import {
  Store,
  Package,
  ShoppingBag,
  LayoutGrid,
  UserRound,
  Gauge,
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
  dashboard: {
    name: "Dashboard",
    url: "/admin",
    icon: Gauge,
  },
  dropdowns: [
    {
      title: "Products",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        { title: "All Products", url: "/admin/products" },
        { title: "Add Product", url: "/admin/products/addProduct" },
      ],
    },
  ],
  menus: [
    { name: "Orders", url: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", url: "/admin/categories", icon: LayoutGrid },
    { name: "Users", url: "/admin/users", icon: UserRound },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AdminSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderTitle headerData={data.headerData} />
      </SidebarHeader>

      <SidebarContent>
        <MainMenu
          dashboard={data.dashboard}
          dropdowns={data.dropdowns}
          menus={data.menus}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
