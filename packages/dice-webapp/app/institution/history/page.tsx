import Navbar from "@/components/navbar/navbar";
import { DataTable } from "@/components/table/data-table";
import { getOrganizationHistory } from "@/components/utils/get-db-data";

export default async function Page() {
  let history = await getOrganizationHistory();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        <DataTable data={history} />
      </div>
    </div>
  );
}
