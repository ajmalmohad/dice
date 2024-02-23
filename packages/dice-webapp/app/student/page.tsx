import Navbar from "@/components/navbar/navbar";
import { StatCard } from "@/components/stats/stat-card";
import { DataTable } from "@/components/table/data-table";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import {
  getStudentStats,
  getStudentRecentCredentials,
} from "@/components/utils/get-db-data";

export default async function Page() {
  let stats = await getStudentStats();
  let creds = await getStudentRecentCredentials();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex justify-stretch gap-4 mb-10">
        <StatCard
          className="grow"
          title="Issued Credentials"
          value={stats.issued.toString()}
          icon={<FaCheck />}
        />
        <StatCard
          className="grow"
          title="Dropped Credentials"
          value={stats.dropped.toString()}
          icon={<IoMdClose />}
        />
        <StatCard
          className="grow"
          title="Pending Credentials"
          value={stats.pending.toString()}
          icon={<MdOutlinePendingActions />}
        />
      </div>
      <DataTable data={creds} />
    </div>
  );
}
