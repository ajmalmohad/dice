import Navbar from "@/components/navbar/navbar";
import { DonutStat } from "@/components/stats/donut-stat";
import { OrganisationStatCard } from "@/components/stats/organisation-stat-card";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-6 flex gap-8 flex-col md:flex-row md:items-center">
        <DonutStat className="self-center min-w-[300px]" ActiveCred={90} PendingCred={10} />
        <div className="grow flex flex-col gap-4">
          <OrganisationStatCard title="Active Organisations" value={90} total={100} />
          <OrganisationStatCard title="Pending Organisations" value={10} total={100} />
        </div>
      </div>
      <DataTable content={"student_cert"} />
    </div>
  );
}
