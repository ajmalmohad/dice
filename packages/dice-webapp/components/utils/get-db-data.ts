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
      issuer: {
        select: {
          name: true,
          image: true,
        },
      },
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

export const getStudentPendingCredentails = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const credentials = await prisma.studentCredentials.findMany({
    select: {
      id: true,
      credentialType: true,
      credentialLink: true,
      issuerWallet: true,
      issueDate: true,
      issuer: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    where: { userId: session?.user.id, pending: true },
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

export const getStudentSharedLinks = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const sharedLinks = await prisma.sharedLink.findMany({
    select: {
      id: true,
      linkName: true,
      active: true,
    },
    where: { userId: session?.user.id },
  });

  return sharedLinks;
};

export const getSharedCredentials = async (linkID: string) => {
  const linkEntries = await prisma.linkEntry.findMany({
    where: {
      sharedLinkId: linkID,
    },
    include: {
      sharedLink: {
        select: {
          active: true,
        },
      },
    },
  });

  if (!linkEntries || !linkEntries[0].sharedLink?.active) {
    return "The shared link is either inactive or invalid";
  }

  const studentCredentialIds = linkEntries.map(
    (entry) => entry.studentCredentialId,
  );

  const studentCredentials = await prisma.studentCredentials.findMany({
    where: {
      id: {
        in: studentCredentialIds,
      },
    },
    select: {
      credentialType: true,
      credentialLink: true,
      issuerWallet: true,
      issueDate: true,
      issuer: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: { issueDate: "desc" },
  });

  let cleanedCredentials = studentCredentials.map((studentCredentials) => {
    return {
      ...studentCredentials,
      issueDate: studentCredentials.issueDate.toDateString(),
    };
  });

  return cleanedCredentials.length > 0
    ? cleanedCredentials
    : "No credentials found for the shared link";
};

export const getOrganizationHistory = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const history = await prisma.studentCredentials.findMany({
    select: {
      userId: true,
      credentialType: true,
      credentialLink: true,
      issueDate: true,
      pending: true,
    },
    where: { issuerId: session?.user.id },
    orderBy: { issueDate: "desc" },
  });

  let cleanedHistory = history.map((history) => {
    return {
      ...history,
      issueDate: history.issueDate.toDateString(),
    };
  });

  return cleanedHistory;
};

export const getRecentOrganizationHistory = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  const history = await prisma.studentCredentials.findMany({
    select: {
      userId: true,
      credentialType: true,
      credentialLink: true,
      issueDate: true,
      pending: true,
    },
    where: { issuerId: session?.user.id },
    orderBy: { issueDate: "desc" },
    take: 10,
  });

  let cleanedHistory = history.map((history) => {
    return {
      ...history,
      issueDate: history.issueDate.toDateString(),
    };
  });

  return cleanedHistory;
};

export const getOrganizationStats = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");
  let issued = await prisma.studentCredentials.count({
    where: {
      issuerId: session?.user.id,
      pending: false,
    },
  });

  let pending = await prisma.studentCredentials.count({
    where: {
      issuerId: session?.user.id,
      pending: true,
    },
  });

  return {
    issued,
    pending,
    total: issued + pending,
  };
};

export const getAdminStats = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");

  let registeredOrganizations = await prisma.user.count({
    where: { role: "INSTITUTION" },
  });

  let pendingOrganizations = await prisma.user.count({
    where: { role: "PENDING_INSTITUTION" },
  });

  let rejectedOrganizations = await prisma.rejectedInstitution.count();

  return {
    registeredOrganizations,
    pendingOrganizations,
    rejectedOrganizations,
  };
};

export const getRecentCredentials = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");

  const credentials = await prisma.studentCredentials.findMany({
    where: { pending: false },
    select: {
      credentialType: true,
      credentialLink: true,
      issuerWallet: true,
      issueDate: true,
      issuer: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { issueDate: "desc" },
    take: 10,
  });

  let cleanedCredentials = credentials.map((credential) => {
    return {
      ...credential,
      issueDate: credential.issueDate.toDateString(),
      issuer: credential.issuer.name,
    };
  });

  return cleanedCredentials;
};

export const getActiveInstiutions = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");

  const institutions = await prisma.user.findMany({
    where: { role: "INSTITUTION" },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  return institutions;
};

export const getPendingOrganizations = async () => {
  const session = await serverSession();
  if (!session) redirect("/auth/login");

  const pendingOrganizations = await prisma.applicationForm.findMany({
    select: {
      id: true,
      institutionName: true,
      institutionAddress: true,
      licenseNumber: true,
      email: true,
      phoneNumber: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return pendingOrganizations;
};
