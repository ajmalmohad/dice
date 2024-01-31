import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type OrganisationCardProps = {
  title: string;
  website: string;
  imageLink: string;
  className?: string;
};

export const OrganisationCard = ({
  title,
  website,
  imageLink,
  className,
}: OrganisationCardProps) => {
  return (
    <Card className={cn("min-w-[200px]", className)}>
      <CardContent className="flex items-center justify-between py-2">
        <div className="flex gap-6 items-center">
          <Avatar>
            <AvatarImage src={imageLink} />
            <AvatarFallback>#</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <div className="text-xl font-medium">{title}</div>
            <div className="text-sm text-ring">{website}</div>
          </div>
        </div>
        <Button className="bg-blue-500 text-white" variant="outline">
          View
        </Button>
      </CardContent>
    </Card>
  );
};
