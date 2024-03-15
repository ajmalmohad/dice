import Navbar from "@/components/navbar/navbar";
import { StatCard } from "@/components/stats/stat-card";
import { DataTable } from "@/components/table/data-table";
import {
  getAdminStats,
  getRecentCredentials,
} from "@/components/utils/get-db-data";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";

export default async function Page() {
  let stats = await getAdminStats();
  let creds = await getRecentCredentials();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex justify-stretch gap-4 mb-10">
        <StatCard
          className="grow"
          title="Registered Organizations"
          value={stats.registeredOrganizations.toString()}
          icon={<FaCheck />}
        />
        <StatCard
          className="grow"
          title="Rejected Organizations"
          value={stats.rejectedOrganizations.toString()}
          icon={<IoMdClose />}
        />
        <StatCard
          className="grow"
          title="Unreviewed Organizations"
          value={stats.pendingOrganizations.toString()}
          icon={<MdOutlinePendingActions />}
        />
      </div>
      <DataTable data={creds} />
    </div>
  );
}
