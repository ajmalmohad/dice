import { ScrollArea } from "@/components/ui/scroll-area";

function SharedLinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-[100vh]">
      <ScrollArea className="grow">
        <div className="p-4">{children}</div>
      </ScrollArea>
    </div>
  );
}

export default SharedLinkLayout;
