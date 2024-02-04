import Navbar from "@/components/navbar/navbar";
import { ProfileAccountTab } from "@/components/student/profile-account-tab";
import { ProfileNameCard } from "@/components/student/profile-name-card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <ProfileNameCard
        className="mb-10"
        name="John Doe"
        avatarUrl="https://i.pravatar.cc/150?u=a04258114e29026302d"
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsContent value="account">
          <ProfileAccountTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
