import { OrganisationReqCard } from "@/components/admin/organisation-req-card";
import Navbar from "@/components/navbar/navbar";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        <OrganisationReqCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationReqCard
          title={"Kerala University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationReqCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationReqCard
          title={"Kerala University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationReqCard
          title={"Kerala University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationReqCard
          title={"Kerala University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
      </div>
    </div>
  );
}
