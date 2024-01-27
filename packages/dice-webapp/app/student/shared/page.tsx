import Navbar from "@/components/navbar/navbar";
import SharedLinkCard from "@/components/student/shared-link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="mb-6">
        <Button variant="special">Add New</Button>
      </div>
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        <SharedLinkCard
          active={true}
          title="All Credentials"
          link="https://googlse.com"
        />
        <SharedLinkCard
          active={false}
          title="University Credentials"
          link="https://googlse.com"
        />
        <SharedLinkCard
          active={true}
          title="All Credentials"
          link="https://googlse.com"
        />
        <SharedLinkCard
          active={false}
          title="School Credentials"
          link="https://googlse.com"
        />
        <SharedLinkCard
          active={true}
          title="College Credentials"
          link="https://googlse.com"
        />
        <SharedLinkCard
          active={false}
          title="University Credentials"
          link="https://googlse.com"
        />
      </div>
    </div>
  );
}
