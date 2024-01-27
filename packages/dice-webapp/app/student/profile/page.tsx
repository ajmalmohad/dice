import Navbar from "@/components/navbar/navbar";
import { ProfileNameCard } from "@/components/student/profile-name-card";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <ProfileNameCard
        className="mb-10"
        name="John Doe"
        avatarUrl="https://i.pravatar.cc/150?u=a04258114e29026302d"
      />
      <div>Hey</div>
    </div>
  );
}
