import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { cn } from "@/lib/utils";

type PendingCredential = {
  imageLink: string;
  title: string;
  issuer: string;
  issueDate: string;
  className?: string;
};

export const PendingCredentialCard = ({
  imageLink,
  title,
  issuer,
  issueDate,
  className,
}: PendingCredential) => {
  return (
    <Card className={cn("min-w-[200px]", className)}>
      <CardContent className="flex p-6 justify-between items-center">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={imageLink} />
            <AvatarFallback>#</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex">
              <div className="ml-2 text-base font-medium">{title}</div>
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
        <div className="ml-1 flex gap-4 text-3xl">
          <div className="cursor-pointer">
            <MdOutlineRemoveRedEye />
          </div>
          <div className="cursor-pointer">
            <IoCheckmarkCircleOutline />
          </div>
          <div className="cursor-pointer">
            <IoIosCloseCircleOutline />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
