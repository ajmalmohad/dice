import Navbar from "@/components/navbar/navbar";
import { ProfileAccountTab } from "@/components/profile/profile-account-tab";
import { ProfileNameCard } from "@/components/profile/profile-name-card";
import { ProfileWeb3Tab } from "@/components/profile/profile-web3-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser } from "@/components/utils/get-server-user";

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
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="web3">Web 3</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="account">
          <ProfileAccountTab
            name={user.name}
            profileUrl={user.image || ""}
            email={user.email}
          />
        </TabsContent>
        <TabsContent className="pt-4" value="web3">
          <ProfileWeb3Tab walletId="0xsdfkiriewu3848f348" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
