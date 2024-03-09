import Navbar from "@/components/navbar/navbar";
import { DonutStat } from "@/components/stats/donut-stat";
import { OrganisationStatCard } from "@/components/stats/organisation-stat-card";
import { DataTable } from "@/components/table/data-table";
import {
  getOrganizationStats,
  getRecentOrganizationHistory,
} from "@/components/utils/get-db-data";

export default async function Page() {
  let history = await getRecentOrganizationHistory();
  let stats = await getOrganizationStats();

  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-6 flex gap-8 flex-col md:flex-row md:items-center">
        <DonutStat
          className="self-center min-w-[300px]"
          ActiveCred={stats.issued}
          PendingCred={stats.pending}
        />
        <div className="grow flex flex-col gap-4">
          <OrganisationStatCard
            title="Active Credentials"
            value={stats.issued}
            total={stats.total}
          />
          <OrganisationStatCard
            title="Pending Credentials"
            value={stats.pending}
            total={stats.total}
          />
        </div>
      </div>
      <DataTable data={history} />
    </div>
  );
}
