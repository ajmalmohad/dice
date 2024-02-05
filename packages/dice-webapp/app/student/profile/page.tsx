import Navbar from "@/components/navbar/navbar";
import { ProfileAccountTab } from "@/components/profile/profile-account-tab";
import { ProfileNameCard } from "@/components/profile/profile-name-card";
import { ProfileWeb3Tab } from "@/components/profile/profile-web3-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <ProfileNameCard
        className="mb-10"
        name="John Doe"
        avatarUrl="https://i.pravatar.cc/150?u=a04258114e29026302d"
        role="Student"
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="web3">Web 3</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="account">
          <ProfileAccountTab />
        </TabsContent>
        <TabsContent className="pt-4" value="web3">
          <ProfileWeb3Tab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
