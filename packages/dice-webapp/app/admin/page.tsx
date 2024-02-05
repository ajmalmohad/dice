import Navbar from "@/components/navbar/navbar";
import { StatCard } from "@/components/stats/stat-card";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex justify-stretch gap-4 mb-10">
        <StatCard
          className="grow"
          title="Registered Organizations"
          value="10"
          icon={<FaCheck />}
        />
        <StatCard
          className="grow"
          title="Rejected Organizations"
          value="10"
          icon={<IoMdClose />}
        />
        <StatCard
          className="grow"
          title="Unreviewed Organizations"
          value="10"
          icon={<MdOutlinePendingActions />}
        />
      </div>
    </div>
  );
}
