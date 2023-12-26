import withAuth from "@/components/auth/acess-restrict";
import { SignOutButton } from "@/components/auth/google-auth";

async function Page() {
  return (
    <div>
      Pending Instituition
      <SignOutButton />
    </div>
  );
}

export default withAuth(Page, "PENDING_INSTITUTION");