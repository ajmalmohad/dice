import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getInitials } from "../utils/formatter";

type ProfileNameProps = {
  name: string;
  avatarUrl?: string;
  className?: string;
  role: string;
};

export const ProfileNameCard = ({
  name,
  avatarUrl,
  className,
  role,
}: ProfileNameProps) => {
  return (
    <Card className={className}>
      <div className="mb-20 relative w-full h-[140px] bg-secondary rounded-sm">
        <div className="absolute flex items-end -bottom-16 left-[20px]">
          <div className="p-2 mr-4 bg-background rounded-full">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || ""} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-2">
            <div className="text-xl font-medium">{name}</div>
            <div className="text-base text-ring">{role}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
