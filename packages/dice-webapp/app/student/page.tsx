import withAuth from "@/components/auth/acess-restrict";
import { DataTable } from "@/components/table/data-table";

async function Page() {
  return (
    <div>
      <DataTable content={"student_cert"} />
    </div>
  );
}

export default withAuth(Page, "STUDENT");
