"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className="w-full rounded-2xl flex items-center gap-4">
      <Input
        radius="lg"
        variant="bordered"
        placeholder="Type to search..."
        startContent={
          <CiSearch className="text-xl text-black/50 mb-0.5 dark:text-white/90 pointer-events-none" />
        }
      />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
    </div>
  );
}
