import { serverSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await serverSession();

  if (session && session.user.role === "STUDENT") redirect("/student");
  else if (session && session.user.role === "INSTITUTION")
    redirect("/institution");
  else if (session && session.user.role === "ADMIN") redirect("/admin");
  else if (session && session.user.role === "PENDING_INSTITUTION")
    redirect("/pending-institution");

  return <div>{children}</div>;
}

export default AuthLayout;
