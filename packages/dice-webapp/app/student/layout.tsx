import Sidebar from "@/components/sidebar/sidebar";
import { StuSidebarData } from "@/components/sidebar/sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[100vh]">
      <Sidebar sidebarData={StuSidebarData} />
      <ScrollArea className="grow">
        <div className="p-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}