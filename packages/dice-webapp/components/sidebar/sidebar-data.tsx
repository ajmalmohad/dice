import { LuLayoutDashboard } from "react-icons/lu";
import {
  BiSolidDashboard,
  BiMessageSquareError,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import {
  PiCertificate,
  PiCertificateFill,
  PiUserBold,
  PiUserFill,
  PiClockCountdown,
  PiClockCountdownFill,
} from "react-icons/pi";
import {
  AiOutlineSafetyCertificate,
  AiFillSafetyCertificate,
} from "react-icons/ai";

export type SidebarItem = {
  title: string;
  path?: string;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export const orgSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "Issue Credential",
    path: "#",
    defaultIcon: <PiCertificate />,
    activeIcon: <PiCertificateFill />,
  },
  {
    title: "Active Credential",
    path: "#",
    defaultIcon: <AiOutlineSafetyCertificate />,
    activeIcon: <AiFillSafetyCertificate />,
  },
  {
    title: "Pending Credential",
    path: "#",
    defaultIcon: <PiClockCountdown />,
    activeIcon: <PiClockCountdownFill />,
  },
  {
    title: "Issues",
    path: "#",
    defaultIcon: <BiMessageSquareError />,
    activeIcon: <BiSolidMessageSquareError />,
  },
  {
    title: "My Profile",
    path: "#",
    defaultIcon: <PiUserBold />,
    activeIcon: <PiUserFill />,
  },
];
