import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CiCircleChevRight } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { getInitials } from "../utils/formatter";

type CredentialCardProps = {
  imageLink?: string | null;
  title: string;
  issuer: string;
  issueDate: string;
  className?: string;
  credLink: string;
};

export const CredentialCard = ({
  imageLink,
  title,
  issuer,
  issueDate,
  credLink,
  className,
}: CredentialCardProps) => {
  return (
    <Card className={cn("min-w-[200px]", className)}>
      <CardContent className="flex p-6 justify-between items-center">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={imageLink ? imageLink : ""} />
            <AvatarFallback>{getInitials(issuer)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex">
              <div className="ml-2 text-base font-medium">
                {title} Credential
              </div>
              <div className="ml-1 text-2xl">
                <AiOutlineSafetyCertificate />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs text-ring font-normal sm:flex-row">
              <div className="ml-2">issued by {issuer}</div>
              <div className="ml-2 sm:ml-0">on {issueDate}</div>
            </div>
          </div>
        </div>
        <div className="ml-1 text-3xl">
          <a href={credLink}>
            <CiCircleChevRight />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
