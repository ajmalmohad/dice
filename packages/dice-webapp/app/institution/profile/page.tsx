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
        name="Kalam Technical University"
        avatarUrl="https://fastly.picsum.photos/id/983/200/200.jpg?hmac=dWGIQKhPUTlF4pkeYDou10SJkQTJDRGf4usmJS38cNY"
        role="Institution"
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="web3">Web 3</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="account">
          <ProfileAccountTab
            name="Kalam Technical University"
            profileUrl="https://fastly.picsum.photos/id/983/200/200.jpg?hmac=dWGIQKhPUTlF4pkeYDou10SJkQTJDRGf4usmJS38cNY"
          />
        </TabsContent>
        <TabsContent className="pt-4" value="web3">
          <ProfileWeb3Tab walletId="0xsdjfdsfiuoiuoejdsfj" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
