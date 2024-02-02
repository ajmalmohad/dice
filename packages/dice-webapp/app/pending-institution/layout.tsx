import withAuth from "@/components/auth/acess-restrict";
import { ScrollArea } from "@/components/ui/scroll-area";

async function PendingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-[100vh]">
      <ScrollArea className="grow">
        <div className="p-4">{children}</div>
      </ScrollArea>
    </div>
  );
}

export default withAuth(PendingLayout, ["PENDING_INSTITUTION"]);