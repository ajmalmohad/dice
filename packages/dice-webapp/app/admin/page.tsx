import withAuth from "@/components/auth/acess-restrict";
import { SignOutButton } from "@/components/auth/google-auth";

async function Page() {
  return (
    <div>
      Admin
      <SignOutButton />
    </div>
  );
}

export default withAuth(Page, "ADMIN");