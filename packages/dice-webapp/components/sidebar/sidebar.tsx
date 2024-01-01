"use client";
import React, { useState } from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { IoMenuOutline } from "react-icons/io5";
import { FaDiceD20 } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@nextui-org/system";
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
        <svg
          className={cn(" ", {
            "visibility: hidden": !isSidebarOpen,
          })}
          width="64"
          height="23"
          viewBox="0 0 64 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:fill-white"
            d="M0.55 0.999999H8.35C10.71 0.999999 12.57 1.34 13.93 2.02C15.31 2.7 16.3 3.8 16.9 5.32C17.52 6.82 17.83 8.88 17.83 11.5C17.83 14.12 17.52 16.19 16.9 17.71C16.3 19.21 15.31 20.3 13.93 20.98C12.57 21.66 10.71 22 8.35 22H0.55V0.999999ZM8.35 18.7C9.67 18.7 10.71 18.47 11.47 18.01C12.23 17.55 12.77 16.8 13.09 15.76C13.43 14.72 13.6 13.3 13.6 11.5C13.6 9.7 13.43 8.28 13.09 7.24C12.77 6.2 12.23 5.45 11.47 4.99C10.71 4.53 9.67 4.3 8.35 4.3H4.78V18.7H8.35ZM21.8781 0.999999H26.1081V22H21.8781V0.999999ZM38.9645 22.36C36.1445 22.36 33.9945 21.72 32.5145 20.44C31.0345 19.14 30.2945 17.23 30.2945 14.71V8.29C30.2945 5.77 31.0345 3.87 32.5145 2.59C33.9945 1.29 36.1445 0.64 38.9645 0.64C40.9245 0.64 42.5245 0.97 43.7645 1.63C45.0245 2.27 46.0245 3.24 46.7645 4.54L43.7345 6.64C43.1145 5.68 42.4645 4.99 41.7845 4.57C41.1245 4.15 40.1845 3.94 38.9645 3.94C37.4245 3.94 36.2945 4.31 35.5745 5.05C34.8745 5.77 34.5245 6.85 34.5245 8.29V14.71C34.5245 16.15 34.8745 17.24 35.5745 17.98C36.2945 18.7 37.4245 19.06 38.9645 19.06C40.2845 19.06 41.3045 18.84 42.0245 18.4C42.7645 17.94 43.4245 17.21 44.0045 16.21L47.0045 18.43C46.3645 19.35 45.7045 20.09 45.0245 20.65C44.3445 21.21 43.5145 21.64 42.5345 21.94C41.5745 22.22 40.3845 22.36 38.9645 22.36ZM56.8061 22C54.1461 22 52.2361 21.44 51.0761 20.32C49.9161 19.2 49.3361 17.58 49.3361 15.46V7.54C49.3361 5.42 49.9161 3.8 51.0761 2.68C52.2361 1.56 54.1461 0.999999 56.8061 0.999999H63.8261V4.3H56.8061C55.7061 4.3 54.8861 4.56 54.3461 5.08C53.8261 5.6 53.5661 6.42 53.5661 7.54V9.85H62.5061V13.15H53.5661V15.46C53.5661 16.56 53.8261 17.38 54.3461 17.92C54.8861 18.44 55.7061 18.7 56.8061 18.7H63.8861V22H56.8061Z"
            fill="#000000"
          />
        </svg>
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
      <div className="p-8">
        <ThemeSwitcher />
      </div>
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
