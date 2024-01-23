"use client";
import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn("w-full rounded-2xl flex items-center gap-4", className)}
    >
      <Input className="p-6" placeholder="Type to search..." />
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    </div>
  );
}
