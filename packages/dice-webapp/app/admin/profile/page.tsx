import Navbar from "@/components/navbar/navbar";
import { ProfileAccountTab } from "@/components/profile/profile-account-tab";
import { ProfileNameCard } from "@/components/profile/profile-name-card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { getUser } from "@/components/utils/get-db-data";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <Navbar className="mb-10" />
      <ProfileNameCard
        className="mb-10"
        name={user.name}
        avatarUrl={user.image || ""}
        role={user.role}
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsContent value="account">
          <ProfileAccountTab
            name={user.name}
            profileUrl={user.image || ""}
            email={user.email}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
