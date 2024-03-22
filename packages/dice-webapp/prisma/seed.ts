import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string | null;
};

type SharedLink = {
  id: string;
  linkName: string | null;
  active: boolean;
  userId: string;
};

type StudentCredential = {
  id: string;
  credentialType: string;
  credentialLink: string;
  issuerWallet: string;
  transactionId: string;
  issueDate: Date;
  verified: boolean | null;
  pending: boolean;
  userId: string;
  issuerId: string;
};

async function addUser(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> {
  password = await hash(password, 12);
  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password,
      role,
    },
  });
}

async function addCredential(
  type: string,
  issuer: User,
  reciever: User,
  pending: boolean = false,
): Promise<StudentCredential> {
  return await prisma.studentCredentials.create({
    data: {
      credentialType: type,
      credentialLink: "https://example.com/credential.pdf",
      issuerWallet: "0x" + randomBytes(20).toString("hex"),
      transactionId: crypto.randomUUID(),
      userId: reciever.id,
      issuerId: issuer.id,
      verified: true,
      pending: pending,
    },
  });
}

async function addRejectedCredential(
  type: string,
  issuer: User,
  reciever: User,
) {
  return await prisma.rejectedCredentials.create({
    data: {
      credentialType: type,
      credentialLink: "https://example.com/rejected_credential.pdf",
      issuerWallet: "0x" + randomBytes(20).toString("hex"),
      transactionId: crypto.randomUUID(),
      userId: reciever.id,
      issuerId: issuer.id,
      verified: false,
    },
  });
}

async function createSharedLink(
  userId: string,
  linkName: string,
): Promise<SharedLink> {
  const sharedLink = await prisma.sharedLink.create({
    data: {
      linkName,
      active: true,
      userId,
    },
  });

  return sharedLink;
}

async function addLinkEntry(
  sharedLink: SharedLink,
  studentCredential: StudentCredential,
) {
  await prisma.linkEntry.create({
    data: {
      sharedLinkId: sharedLink.id,
      studentCredentialId: studentCredential.id,
    },
  });
}

async function addStudent(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "STUDENT");
}

async function addInstitution(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "INSTITUTION");
}

async function addPendingInstitution(
  name: string,
  email: string,
): Promise<User> {
  return await addUser(name, email, email, "PENDING_INSTITUTION");
}

async function addAdmin(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "ADMIN");
}

async function addApplicationForm(
  institution: User,
  address: string,
  licenseNumber: string,
  phoneNumber: string,
) {
  await prisma.applicationForm.create({
    data: {
      institutionName: institution.name,
      institutionAddress: address,
      licenseNumber: licenseNumber,
      email: institution.email,
      phoneNumber,
      userId: institution.id,
    },
  });
}

async function main() {
  let student1 = await addStudent("John Doe", "john@doe.com");

  let institution1 = await addInstitution(
    "Kalam Technical University",
    "admin@ktu.com",
  );

  let institution2 = await addInstitution(
    "Kerala University",
    "admin@kerala.com",
  );

  let credential1 = await addCredential("B.Tech", institution1, student1);
  let credential2 = await addCredential("BSc.", institution2, student1);
  await addCredential("M.Tech", institution1, student1, true);
  await addCredential("MSc.", institution2, student1, true);
  await addCredential("NPTEL", institution1, student1, true);
  await addCredential("Internship", institution2, student1, true);
  await addRejectedCredential("B.Tech", institution1, student1);
  await addRejectedCredential("B.Sc", institution2, student1);

  let sharedLink1 = await createSharedLink(
    student1.id,
    "Undergrad Credentials",
  );
  let sharedLink2 = await createSharedLink(
    student1.id,
    "Engineering Credentials",
  );
  let sharedLink3 = await createSharedLink(student1.id, "Degree Credentials");

  await addLinkEntry(sharedLink1, credential1);
  await addLinkEntry(sharedLink1, credential2);

  await addLinkEntry(sharedLink2, credential1);

  await addLinkEntry(sharedLink3, credential2);

  let institution3 = await addPendingInstitution(
    "Cochin University",
    "admin@cusat.com",
  );
  await addApplicationForm(
    institution3,
    "Kochi Kerala",
    "JJSJFDSAUFS45345",
    "45898345934",
  );

  await addPendingInstitution("Anna University", "admin@anna.com");

  await addAdmin("Admin", "admin@dice.com");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
