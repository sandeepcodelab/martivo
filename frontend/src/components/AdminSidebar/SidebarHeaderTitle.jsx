import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarHeaderTitle({ headerData }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <img src={headerData.logo} alt="LOGO" />
          </div>

          <div className="flex-1 text-left">
            <img src={headerData.name} alt="LOGO" className="w-[120px]" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
