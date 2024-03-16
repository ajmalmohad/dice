"use client";

import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type SharedLinkCardProps = {
  title: string;
  link: string;
  linkId: string;
  active: boolean;
  className?: string;
};

export const SharedLinkCard = ({
  title,
  link,
  linkId,
  className,
  active,
}: SharedLinkCardProps) => {
  let { toast } = useToast();
  let [checked, setChecked] = useState(active);

  const copylink = () => {
    navigator.clipboard.writeText(link);
    toast({ title: "Copied", description: "Link copied to clipboard" });
  };

  const setActiveState = async (active: boolean) => {
    let res = await fetch("/api/sharedlink/active", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: linkId, active: active }),
    });

    let data = await res.json();

    if (res.status === 200) {
      toast({ title: "Success", description: data.message });
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn("flex flex-col min-w-[300px]", className)}>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{title}</div>
          <Switch
            checked={checked}
            onClick={() => {
              setChecked(!checked);
              setActiveState(!checked);
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm border p-2 rounded-sm text-ring overflow-hidden">
            <p>{link}</p>
          </div>
          <div className="flex justify-end gap-4 text-xl">
            <a href={link}>
              <div className="cursor-pointer">
                <FiExternalLink />
              </div>
            </a>
            <div className="cursor-pointer" onClick={copylink}>
              <MdContentCopy />
            </div>
            <div className="cursor-pointer">
              <AiOutlineDelete />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default SharedLinkCard;
