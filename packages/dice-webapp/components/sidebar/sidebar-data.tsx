import { LuLayoutDashboard } from "react-icons/lu";
import { BsBuildingFillLock, BsBuildingGear } from "react-icons/bs";
import { IoShare, IoShareOutline } from "react-icons/io5";
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

export const AdmSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "All Organizations",
    path: "#",
    defaultIcon: <BsBuildingGear />,
    activeIcon: <BsBuildingFillLock />,
  },
  {
    title: "Pending Requests",
    path: "#",
    defaultIcon: <PiClockCountdown />,
    activeIcon: <PiClockCountdownFill />,
  },
  {
    title: "My Profile",
    path: "#",
    defaultIcon: <PiUserBold />,
    activeIcon: <PiUserFill />,
  },
];

export const OrgSidebarData: SidebarItem[] = [
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

export const StuSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/student",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "My Credentials",
    path: "/student/my-credentials",
    defaultIcon: <PiCertificate />,
    activeIcon: <PiCertificateFill />,
  },
  {
    title: "Pending Credentials",
    path: "/student/pending-credentials",
    defaultIcon: <PiClockCountdown />,
    activeIcon: <PiClockCountdownFill />,
  },
  {
    title: "Manage Shared",
    path: "/student/shared",
    defaultIcon: <IoShareOutline />,
    activeIcon: <IoShare />,
  },
  {
    title: "My Profile",
    path: "/student/profile",
    defaultIcon: <PiUserBold />,
    activeIcon: <PiUserFill />,
  },
];
