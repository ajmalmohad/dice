import Navbar from "@/components/navbar/navbar";
import { ProfileAccountTab } from "@/components/profile/profile-account-tab";
import { ProfileNameCard } from "@/components/profile/profile-name-card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <ProfileNameCard
        className="mb-10"
        name="Bobbie Burns"
        avatarUrl="https://i.pravatar.cc/150?u=f4cortoiuvoui"
        role="Admin"
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsContent value="account">
          <ProfileAccountTab
            name="Bobbie Burns"
            profileUrl="https://i.pravatar.cc/150?u=f4cortoiuvoui"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
