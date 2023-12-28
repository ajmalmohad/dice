import withAuth from "@/components/auth/acess-restrict";
import { SignOutButton } from "@/components/auth/google-auth";
import { serverSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WaitForConfirmation } from "@/components/institution/wait-confirm";
import { ApplicationForm } from "@/components/institution/apply-form";

async function Page() {
  const session = await serverSession();
  if(!session) redirect("/auth");

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    }
  });

  return (
    <div>
      {user?.pending ? <ApplicationForm /> : <WaitForConfirmation />}
      <SignOutButton />
    </div>
  );
}

export default withAuth(Page, "PENDING_INSTITUTION");
