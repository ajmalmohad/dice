import withAuth from "@/components/auth/acess-restrict";
import Sidebar from "@/components/sidebar/sidebar";
import { AdmSidebarData } from "@/components/sidebar/sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-[100vh]">
      <Sidebar sidebarData={AdmSidebarData} />
      <ScrollArea className="grow">
        <div className="p-4">{children}</div>
      </ScrollArea>
    </div>
  );
}

export default withAuth(AdminLayout, ["ADMIN"]);
