"use client";

import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/public/DICE.svg";
import { IoMenuOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import { SidebarItem } from "./sidebar-data";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import Link from "next/link";
import { Button } from "../ui/button";


export default function Sidebar({
  sidebarData,
}: {
  sidebarData: SidebarItem[];
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="h-[100vh] w-fit max-w-[320px] flex flex-col border-r-1 border-gray-400 dark:border-gray-800 ">
      <section className="flex items-center gap-4 text-3xl m-4 mb-4">
        <IoMenuOutline
          onClick={toggleSidebar}
          className="text-black dark:text-white"
        />
        <div
          className={`flex grow justify-between items-center gap-2 ${!isSidebarOpen ? "hidden" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Image height={20} className="dark:invert" src={LogoPath} alt="DICE" />
          </div>
          <ThemeSwitcher />
        </div>
      </section>
      <main className="h-full p-2 flex flex-col justify-between text-black dark:text-white">
        <div>
          {sidebarData.map((item, idx) => (
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
        <Button variant="destructive" className={`my-2 text-lg w-full flex gap-4 py-6 items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
          onClick={() => {
            signOut();
          }}
        >
          <IoMdLogOut />
          <p className={`text-base whitespace-nowrap font-medium ${isSidebarOpen ? "" : "hidden"}`}>
            Logout
          </p>
        </Button>
      </main>
    </div>
  );
}

function SidebarItem(props: SidebarItem & { isSidebarOpen: boolean }) {
  const pathname = usePathname();
  if (pathname === props.path) console.log(pathname);

  return (
    <Link
      href={props.path ?? "#"}
    >
      <Button variant={props.path == pathname ? "secondary" : "ghost"} className={`my-2 text-xl w-full flex gap-4 py-6 items-center ${props.isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
        <div className="text-lg">
          {props.path === pathname ? props.activeIcon : props.defaultIcon}
        </div>
        <p
          className={`text-base whitespace-nowrap font-medium ${props.isSidebarOpen ? "" : "hidden"}`}
        >
          {props.title}
        </p>
      </Button>
    </Link>
  );
}
