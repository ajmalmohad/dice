import withAuth from "@/components/auth/acess-restrict";
import { StatCard } from "@/components/stats/stat-card";
import { DataTable } from "@/components/table/data-table";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";

async function Page() {
  return (
    <div>
      <div className="flex justify-stretch gap-4">
        <StatCard
          className="grow"
          title="Certificados"
          value="10"
          icon={<FaCheck />}
        />
        <StatCard
          className="grow"
          title="Certificados"
          value="10"
          icon={<IoMdClose />}
        />
        <StatCard
          className="grow"
          title="Certificados"
          value="10"
          icon={<MdOutlinePendingActions />}
        />
      </div>
      <DataTable content={"student_cert"} />
    </div>
  );
}

export default withAuth(Page, "STUDENT");
