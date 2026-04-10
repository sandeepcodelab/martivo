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
import logo from "@/assets/favicon.png";
import logoName from "@/assets/logo-name.png";

// Sample data
const menuData = {
  headerData: {
    name: logoName,
    logo: logo,
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
        { title: "Add Product", url: "/admin/products/add" },
      ],
    },
  ],
  menus: [
    { name: "Orders", url: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", url: "/admin/categories", icon: LayoutGrid },
    { name: "Users", url: "/admin/users", icon: UserRound },
  ],
};

export function AdminSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderTitle headerData={menuData.headerData} />
      </SidebarHeader>

      <SidebarContent>
        <MainMenu
          dashboard={menuData.dashboard}
          dropdowns={menuData.dropdowns}
          menus={menuData.menus}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
