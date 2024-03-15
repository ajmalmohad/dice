import { OrganisationReqCard } from "@/components/admin/organisation-req-card";
import Navbar from "@/components/navbar/navbar";
import { getPendingOrganizations } from "@/components/utils/get-db-data";

export default async function Page() {
  let requests = await getPendingOrganizations();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <OrganisationReqCard
              key={request.id}
              id={request.id}
              title={request.institutionName}
              email={request.email}
              imageLink={request.user.image}
            />
          ))
        ) : (
          <div className="text-ring">No pending requests</div>
        )}
      </div>
    </div>
  );
}
