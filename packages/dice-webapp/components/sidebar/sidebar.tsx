"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/public/DICE.svg";
import { IoMenuOutline } from "react-icons/io5";
import { FaDiceD20 } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@nextui-org/system";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { IoIosLogOut } from "react-icons/io";
import { orgSidebarData } from "./sidebar-data";
import Link from "next/link";

function Hover(
  props: React.HtmlHTMLAttributes<HTMLDivElement> & { isActive?: boolean },
) {
  return (
    <div
      {...props}
      className={cn(
        "py-2 px-3 hover:bg-gray-200 dark:hover:bg-zinc-900  transition-all cursor-pointer rounded-sm",
        {
          "dark:border-b-1 dark:border-b-white border-b-1 border-b-black rounded-sm":
            props.isActive,
        },
        props.className,
      )}
    />
  );
}

type Props = {};

export default function Sidebar({}: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }
  return (
    <div
      className={cn(
        "  h-dvh w-[full] flex-col  flex text-slate-50 dark:border-r-1 dark:border-r-white border-r-1 border-r-black  ",
      )}
    >
      <section className="flex items-center gap-4 p-8">
        <Hover
          className={cn("rounded-full py-2 px-2", {
            "mx-2": !isSidebarOpen,
          })}
          onClick={toggleSidebar}
        >
          <IoMenuOutline
            className={cn("text-3xl text-black dark:text-white", {
              "text-4xl": !isSidebarOpen,
            })}
          />
        </Hover>
        <div
          className={cn("text-3xl text-black dark:text-white", {
            "visibility: hidden": !isSidebarOpen,
          })}
        >
          <FaDiceD20 />
        </div>
        <Image
          className={cn("dark:invert", {
            "visibility: hidden": !isSidebarOpen,
          })}
          src={LogoPath}
          alt="DICE"
        />
      </section>
      <main
        className={cn("p-8 flex  flex-col items-start w-[full]  h-full", {
          "w-[full] ": !isSidebarOpen,
        })}
      >
        {orgSidebarData.map((d, i) => (
          <>
            <SidebarItem
              activeIcon={d.activeIcon}
              defaultIcon={d.defaultIcon}
              isSidebarOpen={isSidebarOpen}
              path={d.path}
              title={d.title}
            />
          </>
        ))}
      </main>
      <Button
        color="danger"
        variant="ghost"
        onClick={() => {
          signOut();
        }}
        className={cn(
          "mx-4 my-4 p-3 text-base font-medium hover:font-bold w-[20%] h-[55px]",
          { "visibility: hidden": !isSidebarOpen },
        )}
      >
        Logout
      </Button>
      <Button
        isIconOnly
        color="danger"
        aria-label="Logout"
        onClick={() => {
          signOut();
        }}
        className={cn("text-white text-3xl ml-14 my-4 w-[4%] h-[56px]", {
          "visibility: hidden": isSidebarOpen,
        })}
      >
        <IoIosLogOut />
      </Button>
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
    <Link href={props.path ?? "#"}>
      <Hover
        isActive={pathname === props.path}
        className={cn("w-full flex items-center", {
          "flex-col items-start gap-5 mx-2": !props.isSidebarOpen,
        })}
      >
        <section
          className={cn(
            "text-3xl gap-4 flex items-center text-black dark:text-white",
            {
              "text-4xl": !props.isSidebarOpen,
            },
          )}
        >
          {props.path === pathname ? props.activeIcon : props.defaultIcon}
          <p
            className={cn("text-xl", {
              "visibility: hidden": !props.isSidebarOpen,
            })}
          >
            {" "}
            {props.title}{" "}
          </p>
        </section>
      </Hover>
    </Link>
  );
}
