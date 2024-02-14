import { SignOutButton } from "@/components/auth/creds-auth";
import { serverSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WaitForConfirmation } from "@/components/institution/wait-confirm";
import { ApplicationForm } from "@/components/institution/apply-form";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

async function Page() {
  const session = await serverSession();
  if (!session) redirect("/auth/login");

  let user = await prisma.user.findUnique({
    include: {
      institutionApplication: true,
    },
    where: {
      email: session.user.email,
    },
  });

  return (
    <div className="p-4 min-h-[100vh]">
      <div className="flex justify-end items-center gap-6">
        <ThemeSwitcher />
        <SignOutButton />
      </div>
      {user?.institutionApplication === null ? (
        <ApplicationForm />
      ) : (
        <WaitForConfirmation className="mt-10" />
      )}
    </div>
  );
}

export default Page;
