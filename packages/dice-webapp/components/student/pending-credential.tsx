"use client";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { cn } from "@/lib/utils";
import { getInitials } from "../utils/formatter";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";

type PendingCredential = {
  id: string;
  imageLink?: string | null;
  title: string;
  issuer: string;
  issueDate: string;
  credLink: string;
  className?: string;
};

export const PendingCredentialCard = ({
  id,
  imageLink,
  title,
  issuer,
  issueDate,
  credLink,
  className,
}: PendingCredential) => {
  let { toast } = useToast();
  const isLoading = useRef<boolean>(false);

  const handleReject = async () => {
    if (isLoading.current) return;

    isLoading.current = true;
    toast({ title: "Rejecting credential", description: "Please wait" });

    const res = await fetch("/api/credential/reject", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    
    if (res.status === 200) {
      toast({ title: "Success", description: data.message });
      location.reload();
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      isLoading.current = false;
    }
  }

  const handleAccept = async () => {
    // Accept Via Blockchain too firsty
    if(isLoading.current) return;

    isLoading.current = true;
    toast({ title: "Accepting credential", description: "Please wait" });

    const res = await fetch("/api/credential/accept", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    
    if (res.status === 200) {
      toast({ title: "Success", description: data.message });
      location.reload();
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      isLoading.current = false;
    }
  }

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
        <div className="ml-1 flex gap-4 text-3xl">
          <div className="cursor-pointer">
            <a href={credLink}>
              <MdOutlineRemoveRedEye />
            </a>
          </div>
          <div className="cursor-pointer" onClick={handleAccept}>
            <IoCheckmarkCircleOutline />
          </div>
          <div className="cursor-pointer" onClick={handleReject}>
            <IoIosCloseCircleOutline />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
