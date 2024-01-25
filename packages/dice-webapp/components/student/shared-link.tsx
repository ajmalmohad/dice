import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

type SharedLinkCardProps = {
  title: string;
  link: string;
  active?: boolean;
  className?: string;
};

export const SharedLinkCard = ({
  title,
  link,
  className,
  active,
}: SharedLinkCardProps) => {
  return (
    <Card className={cn("flex flex-col min-w-[300px]", className)}>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium">{title}</div>
          <Switch checked={active} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-base border p-2 rounded-sm text-ring overflow-hidden">
            <a href={link}>{link}</a>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline">Visit</Button>
            <Button>Copy</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default SharedLinkCard;
