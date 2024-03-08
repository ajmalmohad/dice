import { serverSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
};

export const getWallets = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const wallets = await prisma.wallets.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: "desc" },
  });
  return wallets;
};

export const getStudentStats = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  let issued = await prisma.studentCredentials.count({
    where: {
      userId: session?.user.id,
      pending: false,
    },
  });

  let dropped = await prisma.rejectedCredentials.count({
    where: {
      userId: session?.user.id,
    },
  });

  let pending = await prisma.studentCredentials.count({
    where: {
      userId: session?.user.id,
      pending: true,
    },
  });

  return {
    issued,
    dropped,
    pending,
  };
};

export const getStudentRecentCredentials = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const credentials = await prisma.studentCredentials.findMany({
    select: {
      credentialType: true,
      credentialLink: true,
      issuerWallet: true,
      issueDate: true,
      pending: true,
    },
    where: { userId: session?.user.id },
    orderBy: { issueDate: "desc" },
    take: 10,
  });

  let cleanedCredentials = credentials.map((credential) => {
    return {
      ...credential,
      issueDate: credential.issueDate.toDateString(),
    };
  });

  return cleanedCredentials;
};

export const getStudentActiveCredentails = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const credentials = await prisma.studentCredentials.findMany({
    select: {
      credentialType: true,
      credentialLink: true,
      issuerWallet: true,
      issueDate: true,
    },
    where: { userId: session?.user.id, pending: false },
    orderBy: { issueDate: "desc" },
  });

  let cleanedCredentials = credentials.map((credential) => {
    return {
      ...credential,
      issueDate: credential.issueDate.toDateString(),
    };
  });

  return cleanedCredentials;
};
