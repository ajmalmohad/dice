import Navbar from "@/components/navbar/navbar";
import { CreateSharedLink } from "@/components/student/create-shared-link";
import SharedLinkCard from "@/components/student/shared-link";
import { getStudentSharedLinks } from "@/components/utils/get-db-data";
import { headers } from "next/headers";

export default async function Page() {
  const headersList = headers();
  const links = await getStudentSharedLinks();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="mb-6">
        <CreateSharedLink />
      </div>
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        {links && links.length > 0 ? (
          links.map((link, index) => {
            return (
              <SharedLinkCard
                title={link.linkName}
                link={
                  "http://" +
                  headersList.get("host") +
                  "/shared/link/" +
                  link.id
                }
                linkId={link.id}
                active={link.active}
                key={index}
              />
            );
          })
        ) : (
          <div className="text-ring">No shared links found</div>
        )}
      </div>
    </div>
  );
}
