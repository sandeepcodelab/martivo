import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarHeaderTitle({ headerData }) {
  console.log(headerData);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            {/* <ActiveLogo className="size-6 text-white" /> */}
            <img src={headerData.logo} alt="LOGO" />
          </div>

          <div className="flex-1 text-left">
            <img src={headerData.name} alt="LOGO" className="w-[150px]" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
