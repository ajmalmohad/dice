"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { cn } from "@/lib/utils";
import { getInitials } from "../utils/formatter";
import { useSession } from "next-auth/react";

export default function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession();
  let [image, setImage] = React.useState<string>("");

  useEffect(() => {
    (async () => {
      let res = await fetch("/api/profile/image");
      let data = await res.json();
      setImage(data.image);
    })();
  }, []);

  return (
    <div
      className={cn("w-full rounded-2xl flex items-center gap-4", className)}
    >
      <Input className="p-6" placeholder="Type to search..." />
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>
          {getInitials(session?.user?.name ? session.user.name : "USER")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
