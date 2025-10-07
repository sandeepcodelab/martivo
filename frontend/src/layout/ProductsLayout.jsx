import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Filter, CustomTrigger } from "@/components/Sidebar/Filter";
import Container from "@/components/Container/Container";

export default function FilterLayout({ children }) {
  return (
    <SidebarProvider>
      <Filter />
      <main className="w-full">
        <Container>
          <CustomTrigger />
        </Container>
        {children}
      </main>
    </SidebarProvider>
  );
}
