import { serverSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
  });
  return user;
};
