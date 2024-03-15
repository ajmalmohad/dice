import { OrganisationCard } from "@/components/admin/organisation-card";
import Navbar from "@/components/navbar/navbar";
import { getActiveInstiutions } from "@/components/utils/get-db-data";

export default async function Page() {
  let orgs = await getActiveInstiutions();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        {orgs && orgs.length > 0 ? (
          orgs.map((org, idx) => {
            return (
              <OrganisationCard
                key={idx}
                title={org.name}
                email={org.email}
                imageLink={org.image}
              />
            );
          })
        ) : (
          <div className="text-ring">No active institutions</div>
        )}
      </div>
    </div>
  );
}
