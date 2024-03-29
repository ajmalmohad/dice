import { LuLayoutDashboard } from "react-icons/lu";
import { BsBuildingFillLock, BsBuildingGear } from "react-icons/bs";
import { IoShare, IoShareOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import {
  PiCertificate,
  PiCertificateFill,
  PiUserBold,
  PiUserFill,
  PiClockCountdown,
  PiClockCountdownFill,
} from "react-icons/pi";
import { RiFolderHistoryFill, RiFolderHistoryLine } from "react-icons/ri";

export type SidebarItem = {
  title: string;
  path?: string;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export const AdmSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "All Organizations",
    path: "/admin/all-organizations",
    defaultIcon: <BsBuildingGear />,
    activeIcon: <BsBuildingFillLock />,
  },
  {
    title: "Pending Requests",
    path: "/admin/pending-organizations",
    defaultIcon: <PiClockCountdown />,
    activeIcon: <PiClockCountdownFill />,
  },
  {
    title: "My Profile",
    path: "/admin/profile",
    defaultIcon: <PiUserBold />,
    activeIcon: <PiUserFill />,
  },
];

export const OrgSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/institution",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "Issue Credential",
    path: "/institution/issue-credential",
    defaultIcon: <PiCertificate />,
    activeIcon: <PiCertificateFill />,
  },
  {
    title: "History",
    path: "/institution/history",
    defaultIcon: <RiFolderHistoryLine />,
    activeIcon: <RiFolderHistoryFill />,
  },
  {
    title: "My Profile",
    path: "/institution/profile",
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
