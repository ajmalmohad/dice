import { OrganisationCard } from "@/components/admin/organisation-card";
import Navbar from "@/components/navbar/navbar";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        <OrganisationCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Calicut University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Calicut University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Calicut University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Kalam Technical University"}
          website={"https://ktu.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
        <OrganisationCard
          title={"Calicut University"}
          website={"https://calicut.edu.in"}
          imageLink={"https://picsum.photos/200"}
        />
      </div>
    </div>
  );
}
