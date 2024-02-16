import { serverSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";

export default function withAuth<P extends object>(
  WrappedComponent: NextPage<P>,
  roles: string[],
): NextPage<P> {
  const AuthComponent: NextPage<P> = async ({ ...props }) => {
    const session = await serverSession();
    if (!session || !roles.includes(session.user.role)) redirect("/auth/login");
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}
