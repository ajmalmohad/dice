import Sidebar from "@/components/sidebar/sidebar";
import { StuSidebarData } from "@/components/sidebar/sidebar-data";
import { DataTable } from "@/components/table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {

  return <div className="flex max-h-[100vh]">
    <Sidebar sidebarData={StuSidebarData} />
    <ScrollArea className="grow">
      <div className="p-4">
        <DataTable content={'student_cert'} caption="List of certificates" />
      </div>
    </ScrollArea>
  </div>;
}
