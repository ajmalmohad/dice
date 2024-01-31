import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type OrganisationReqCardProps = {
  title: string;
  website: string;
  imageLink: string;
  className?: string;
};

export const OrganisationReqCard = ({
  title,
  website,
  imageLink,
  className,
}: OrganisationReqCardProps) => {
  return (
    <Card className={cn("w-[350px] min-w-[350px]", className)}>
      <CardContent className="flex flex-col items-center justify-between p-4 gap-6">
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
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Button
              className="bg-green-500 text-white w-[110px] hover:bg-green-500/90 dark:bg-green-700  dark:hover:bg-green-700/90"
              variant="destructive"
            >
              Accept
            </Button>
            <Button className="w-[110px]" variant="destructive">
              Reject
            </Button>
          </div>
          <Button
            className="bg-blue-500 text-white w-[250px]"
            variant="outline"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
