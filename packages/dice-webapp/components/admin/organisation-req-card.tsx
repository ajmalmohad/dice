import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { getInitials } from "../utils/formatter";
import { useWeb3 } from "../auth/web3-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type OrganisationReqCardProps = {
  id: string;
  title: string;
  email: string;
  imageLink: string | null;
  loading: boolean;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
  institutionDetails: {
    institutionName: string;
    institutionAddress: string;
    licenseNumber: string;
    phoneNumber: string;
  };
};

export const OrganisationReqCard = ({
  title,
  email,
  imageLink,
  loading,
  onAccept,
  onReject,
  className,
  institutionDetails,
}: OrganisationReqCardProps) => {
  const { contract } = useWeb3();
  const [formData] = useState({
    institutionName: institutionDetails.institutionName,
    institutionAddress: institutionDetails.institutionAddress,
    licenseNumber: institutionDetails.licenseNumber,
    phoneNumber: institutionDetails.phoneNumber,
  });

  return (
    <>
      <Card className={className}>
        <CardContent className="flex flex-col p-4 gap-6">
          <div className="flex gap-6 items-center">
            <Avatar>
              <AvatarImage src={imageLink ? imageLink : ""} />
              <AvatarFallback>{getInitials(title)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <div className="text-xl font-medium">{title}</div>
              <div className="text-sm text-ring">{email}</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button
                disabled={loading || !contract}
                onClick={onAccept}
                className="grow bg-green-500 text-white w-full hover:bg-green-500/90 dark:bg-green-700  dark:hover:bg-green-700/90"
              >
                Accept
              </Button>
              <Button
                onClick={onReject}
                disabled={loading || !contract}
                className="grow w-full"
                variant="destructive"
              >
                Reject
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-gray-500 text-white w-full hover:bg-gray-500/90 dark:bg-gray-700  dark:hover:bg-gray-700/90"
                  variant="secondary"
                >
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                  <DialogTitle>Institution Details</DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <DialogDescription>
                    <div className={className + " flex flex-col gap-6"}>
                      <div className="flex flex-row gap-6 items-center">
                        <p className="whitespace-nowrap">Institution Name</p>
                        <Input
                          className="p-6"
                          type="text"
                          value={formData.institutionName}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col gap-6">
                        <p className="whitespace-nowrap">Institution Address</p>
                        <Textarea
                          className="p-6"
                          value={formData.institutionAddress}
                          disabled
                        />
                      </div>
                      <div className="flex flex-row gap-6  items-center">
                        <p className="whitespace-nowrap">License Number</p>
                        <Input
                          className="p-6 items-center"
                          value={formData.licenseNumber}
                          disabled
                        />
                      </div>
                      <div className="flex flex-row gap-6  items-center">
                        <p className="whitespace-nowrap">Phone Number</p>
                        <Input
                          className="p-6"
                          value={formData.phoneNumber}
                          disabled
                        />
                      </div>
                    </div>
                  </DialogDescription>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
