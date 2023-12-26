import withAuth from "@/components/auth/acess-restrict";
import { SignOutButton } from "@/components/auth/google-auth";

async function Page() {
  return (
    <div>
      Student
      <SignOutButton />
    </div>
  );
}

export default withAuth(Page, "STUDENT");