import Navbar from "@/components/navbar/navbar";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        <DataTable content={"student_cert"}  />
      </div>
    </div>
  );
}
