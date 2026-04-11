import { AdminSidebar } from "@/components/AdminSidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation, Link } from "react-router";

export default function AdminLayout() {
  const location = useLocation();
  let segments = location.pathname.split("/").filter(Boolean);

  function isMongoId(str) {
    return /^[a-f\d]{24}$/i.test(str);
  }

  segments = segments.filter((seg) => seg !== "admin" && !isMongoId(seg));

  const formatLabel = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {/* Dashboard */}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/admin">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;

                  const href =
                    "/" + ["admin", ...segments.slice(0, index + 1)].join("/");

                  return (
                    <span key={index} className="flex items-center">
                      <BreadcrumbSeparator className="hidden md:block" />

                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {formatLabel(segment)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={href}>{formatLabel(segment)}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
