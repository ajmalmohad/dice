import Navbar from "@/components/navbar/navbar";
import { PendingCredentialCard } from "@/components/student/pending-credential";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"KTU"}
          issueDate={"22/10/2024"}
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"M.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <PendingCredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
      </div>
    </div>
  );
}
