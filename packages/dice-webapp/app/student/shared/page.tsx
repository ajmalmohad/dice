import Navbar from "@/components/navbar/navbar";
import SharedLinkCard from "@/components/student/shared-link";
import { Button } from "@/components/ui/button";
import { getStudentSharedLinks } from "@/components/utils/get-db-data";
import { headers } from "next/headers";

export default async function Page() {
  const headersList = headers();
  const links = await getStudentSharedLinks();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="mb-6">
        <Button variant="outline">Add New</Button>
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
          <div>No shared links found</div>
        )}
      </div>
    </div>
  );
}
