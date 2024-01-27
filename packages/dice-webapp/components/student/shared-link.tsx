"use client";

import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";

type SharedLinkCardProps = {
  title: string;
  link: string;
  active?: boolean;
  className?: string;
};

export const SharedLinkCard = ({
  title,
  link,
  className,
  active,
}: SharedLinkCardProps) => {
  let [checked, setChecked] = useState(active);

  return (
    <Card className={cn("flex flex-col min-w-[300px]", className)}>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{title}</div>
          <Switch checked={checked} onClick={()=>{setChecked(!checked)}}/>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm border p-2 rounded-sm text-ring overflow-hidden">
            <a href={link}>{link}</a>
          </div>
          <div className="flex justify-end gap-4 text-xl">
            <div className="cursor-pointer"><FiExternalLink/></div>
            <div className="cursor-pointer"><MdContentCopy/></div>
            <div className="cursor-pointer"><AiOutlineDelete/></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default SharedLinkCard;
