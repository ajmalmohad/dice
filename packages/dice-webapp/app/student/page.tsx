import withAuth from "@/components/auth/acess-restrict";
import Navbar from "@/components/navbar/navbar";
import { StatCard } from "@/components/stats/stat-card";
import { DataTable } from "@/components/table/data-table";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";

async function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex justify-stretch gap-4 mb-10">
        <StatCard
          className="grow"
          title="Issued Credentials"
          value="10"
          icon={<FaCheck />}
        />
        <StatCard
          className="grow"
          title="Dropped Credentials"
          value="10"
          icon={<IoMdClose />}
        />
        <StatCard
          className="grow"
          title="Pending Credentials"
          value="10"
          icon={<MdOutlinePendingActions />}
        />
      </div>
      <DataTable content={"student_cert"} />
    </div>
  );
}

export default withAuth(Page, "STUDENT");
