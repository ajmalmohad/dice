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
} from "react-icons/pi";
import {
  AiOutlineSafetyCertificate,
  AiFillSafetyCertificate,
} from "react-icons/ai";
import { PiClockCountdown, PiClockCountdownFill } from "react-icons/pi";

type SidebarItems = {
  title: string;
  path?: string;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export const orgSidebarData: SidebarItems[] = [
  {
    title: "Dashboard",
    path: "/",
    defaultIcon: <LuLayoutDashboard />,
    activeIcon: <BiSolidDashboard />,
  },
  {
    title: "Issue Credential",
    path: "/issuecredential",
    defaultIcon: <PiCertificate />,
    activeIcon: <PiCertificateFill />,
  },
  {
    title: "Active Credential",
    path: "/activecredential",
    defaultIcon: <AiOutlineSafetyCertificate />,
    activeIcon: <AiFillSafetyCertificate />,
  },
  {
    title: "Pending Credential",
    path: "/pendingcredential",
    defaultIcon: <PiClockCountdown />,
    activeIcon: <PiClockCountdownFill />,
  },
  {
    title: "Issues",
    path: "/issues",
    defaultIcon: <BiMessageSquareError />,
    activeIcon: <BiSolidMessageSquareError />,
  },
  {
    title: "My Profile",
    path: "/myprofile",
    defaultIcon: <PiUserBold />,
    activeIcon: <PiUserFill />,
  },
];