"use client";

import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/public/DICE.svg";
import { IoMenuOutline } from "react-icons/io5";
import { FaDiceD20 } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import { SidebarItem } from "./sidebar-data";
import Link from "next/link";

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
      <section className="flex items-center gap-4 text-3xl m-4 mb-8">
        <IoMenuOutline
          onClick={toggleSidebar}
          className="text-black dark:text-white"
        />
        <div className={`flex items-center ${!isSidebarOpen ? "hidden" : ""}`}>
          <FaDiceD20 className="text-black dark:text-white" />
          <Image className="dark:invert ml-2" src={LogoPath} alt="DICE" />
        </div>
      </section>
      <main className="h-full flex flex-col justify-between text-black dark:text-white">
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
        <div
          className="cursor-pointer p-4 text-3xl text-red-600 flex items-center gap-4 hover:bg-red-600 hover:text-white hover:rounded-lg"
          onClick={() => {
            signOut();
          }}
        >
          <IoMdLogOut />
          <p className={`text-xl font-medium ${isSidebarOpen ? "" : "hidden"}`}>
            Logout
          </p>
        </div>
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
      className={`p-4 text-3xl flex items-center gap-4 hover:bg-gray-300 hover:dark:bg-gray-900 ${
        props.path == pathname
          ? "border-r-3 border-black dark:border-white "
          : ""
      }}`}
    >
      <div>
        {props.path === pathname ? props.activeIcon : props.defaultIcon}
      </div>
      <p
        className={`text-xl font-medium ${props.isSidebarOpen ? "" : "hidden"}`}
      >
        {props.title}
      </p>
    </Link>
  );
}
