"use client";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { cn } from "@/lib/utils";
import { getInitials } from "../utils/formatter";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PendingCredential = {
  imageLink?: string | null;
  issuer: string;
  issuerEmail: string;
  issuerWalletID: string;
  issueDate: string;
  credType: string;
  credLink: string;
  className?: string;
  contract: any;
  handleReject: () => void;
  handleAccept: () => void;
};

export const PendingCredentialCard = ({
  imageLink,
  issuer,
  issuerEmail,
  issuerWalletID,
  issueDate,
  credType,
  credLink,
  contract,
  className,
  handleReject,
  handleAccept,
}: PendingCredential) => {
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
                {credType} Credential
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
          <Dialog>
            <DialogTrigger asChild>
              <IoIosInformationCircleOutline />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
              <DialogHeader>
                <DialogTitle>Credential Details</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <DialogDescription>
                  <div className={className + " flex flex-col gap-6"}>
                    <div className="flex flex-row gap-6  items-center">
                      <p className="whitespace-nowrap">Credential Type</p>
                      <Input className="p-6" value={credType} disabled />
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                      <p className="whitespace-nowrap">Issuer Name</p>
                      <Input
                        className="p-6"
                        type="text"
                        value={issuer}
                        disabled
                      />
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                      <p className="whitespace-nowrap">Issuer Email</p>
                      <Input
                        className="p-6"
                        type="text"
                        value={issuerEmail}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="whitespace-nowrap">Issuer Wallet ID</p>
                      <Input className="p-6" value={issuerWalletID} disabled />
                    </div>
                  </div>
                </DialogDescription>
              </div>
            </DialogContent>
          </Dialog>
          <div className="cursor-pointer">
            <a href={credLink}>
              <MdOutlineRemoveRedEye />
            </a>
          </div>
          <div
            className={`${contract === null ? "text-secondary" : "cursor-pointer"
            }`}
            onClick={handleAccept}
          >
            <IoCheckmarkCircleOutline />
          </div>
          <div
            className={`${contract === null ? "text-secondary" : "cursor-pointer"
            }`}
            onClick={handleReject}
          >
            <IoIosCloseCircleOutline />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
