"use client";

import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/public/DICE.svg";
import { IoMenuOutline } from "react-icons/io5";
import { FaDiceD20 } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import { orgSidebarData } from "./sidebar-data";
import Link from "next/link";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="h-[100vh] w-fit max-w-[320px] flex flex-col text-slate-50 border border-solid border-r-black">
      <section className="flex items-center gap-4 text-3xl m-4 mb-8">
        <IoMenuOutline onClick={toggleSidebar} className="text-black dark:text-white" />
        <div className={`flex items-center ${!isSidebarOpen ? "hidden" : ""}`}>
          <FaDiceD20 className="text-black dark:text-white" />
          <Image
            className="dark:invert ml-2"
            src={LogoPath}
            alt="DICE"
          />
        </div>
      </section>
      <main
        className="h-full flex flex-col justify-between text-black dark:text-white"
      >
        <div>
          {orgSidebarData.map((item, idx) => (
            <SidebarItem
              key={idx}
              activeIcon={item.activeIcon}
              defaultIcon={item.defaultIcon}
              isSidebarOpen={isSidebarOpen}
              path={item.path}
              title={item.title}
            />
          ))}
        </div>
        <div
          className="cursor-pointer p-4 text-3xl flex items-center gap-4"
          onClick={() => {
            signOut();
          }}
        >
          <IoMdLogOut />
          <p className={`text-xl ${isSidebarOpen ? "" : "hidden"}`}>
            Logout
          </p>
        </div>
      </main>
    </div>
  );
}

type SidebarItemProps = {
  title: string;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  path?: string;
  isSidebarOpen: boolean;
};

function SidebarItem(props: SidebarItemProps) {
  const pathname = usePathname();
  return (
    <Link href={props.path ?? "#"} className="p-4 text-3xl flex items-center gap-4">
      <div>
        {props.path === pathname ? props.activeIcon : props.defaultIcon}
      </div>
      <p className={`text-xl ${props.isSidebarOpen ? "" : "hidden"}`}>
        {props.title}
      </p>
    </Link>
  );
}
