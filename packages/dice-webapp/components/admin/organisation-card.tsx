import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { MdOutlineRemoveRedEye } from "react-icons/md";

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
      <CardContent className="flex items-center justify-between pt-4">
        <div className="flex gap-6 items-center">
          <Avatar>
            <AvatarImage src={imageLink} />
            <AvatarFallback>#</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <div className="text-xl font-medium">{title}</div>
            <div className="text-sm text-ring">{website}</div>
          </div>
        </div>
        <div className="cursor-pointer text-3xl">
          <MdOutlineRemoveRedEye />
        </div>
      </CardContent>
    </Card>
  );
};
