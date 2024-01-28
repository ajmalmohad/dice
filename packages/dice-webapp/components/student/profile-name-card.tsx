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
  const getIntials = (name: string) => { 
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <Card className={className}>
      <div className="mb-20 relative w-full h-[140px] bg-secondary rounded-sm">
        <div className="absolute flex items-end -bottom-16 left-[20px]">
          <div className="p-2 mr-4 bg-background rounded-full">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || ""} />
              <AvatarFallback>{getIntials(name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-2">
            <div className="text-xl font-medium">{name}</div>
            <div className="text-base text-ring">Student</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
