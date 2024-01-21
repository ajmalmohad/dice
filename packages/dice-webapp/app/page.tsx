import Sidebar from "@/components/sidebar/sidebar";
import { StuSidebarData } from "@/components/sidebar/sidebar-data";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  return <div className="flex items-stretch">
    <Sidebar sidebarData={StuSidebarData} />
    <DataTable caption="List of certificates"/>
  </div>;
}
