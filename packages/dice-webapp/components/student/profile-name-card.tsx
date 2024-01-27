import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

type ProfileNameProps = {
  name: string;
  avatarUrl?: string;
  className?: string;
};

export const ProfileNameCard = ({
  name,
  avatarUrl,
  className,
}: ProfileNameProps) => {
  return (
    <Card className={className}>
      <div className="mb-20 relative w-full h-[140px] bg-secondary rounded-sm">
        <div className="absolute flex items-end -bottom-16 left-[20px]">
          <Avatar className="h-24 w-24 mr-4">
            <AvatarImage src={avatarUrl || ""} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-xl font-medium">{name}</div>
            <div className="text-base text-ring">Student</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
