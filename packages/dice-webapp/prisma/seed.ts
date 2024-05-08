import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string | null;
};

type Wallet = {
  id: string;
  walletID: string;
  userId: string;
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

async function addStudent(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "STUDENT");
}

async function addPendingInstitution(
  name: string,
  email: string,
): Promise<User> {
  return await addUser(name, email, email, "PENDING_INSTITUTION");
}

async function createSharedLink(linkname: string, user: User) {
  return await prisma.sharedLink.create({
    data: {
      linkName: linkname,
      active: true,
      userId: user.id,
    },
  });
}

async function addLinkEntries(sharedLinkId: string, certificateId: string[]) {
  for (let i = 0; i < certificateId.length; i++) {
    await prisma.linkEntry.create({
      data: {
        sharedLinkId: sharedLinkId,
        studentCredentialId: certificateId[i],
      },
    });
  }
}

async function addInstitution(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "INSTITUTION");
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

async function addWallet(institution: User, walletId: string): Promise<Wallet> {
  return await prisma.wallets.create({
    data: {
      walletID: walletId,
      userId: institution.id,
    },
  });
}

async function addIssuedCertificate(
  institution: User,
  institutionWallet: Wallet,
  student: User,
  credentialId: string,
  credentialType: string,
  credentialLink: string,
) {
  return await prisma.studentCredentials.create({
    data: {
      id: credentialId,
      credentialId: parseInt(credentialId),
      credentialType: credentialType,
      credentialLink: credentialLink,
      issuerWallet: institutionWallet.walletID,
      transactionId: "0x324dwe39249d3222",
      issueDate: new Date(),
      verified: true,
      pending: false,
      userId: student.id,
      issuerId: institution.id,
    },
  });
}

async function addPendingCertificate(
  institution: User,
  institutionWallet: Wallet,
  student: User,
  credentialId: string,
  credentialType: string,
  credentialLink: string,
) {
  await prisma.studentCredentials.create({
    data: {
      id: credentialId,
      credentialId: parseInt(credentialId),
      credentialType: credentialType,
      credentialLink: credentialLink,
      issuerWallet: institutionWallet.walletID,
      transactionId: "0x324dwe39249d3222",
      issueDate: new Date(),
      verified: true,
      pending: true,
      userId: student.id,
      issuerId: institution.id,
    },
  });
}

async function main() {
  await addAdmin("Admin", "admin@dice.com");

  let ktu = await addInstitution("Kalam Technical University", "admin@ktu.com");
  let ktuwallet = await addWallet(ktu, "0x48f438u43f8943r8u4839f34urf8j4");
  await addApplicationForm(
    ktu,
    "Trivandrum Kerala",
    "JSHAFKSHKFRUFFNFW",
    "99349324234",
  );

  let cusat = await addInstitution("Cochin University", "admin@cusat.com");
  let cusatwallet = await addWallet(cusat, "0x43r8u4839f34u48f438u43f89rf8j4");
  await addApplicationForm(
    cusat,
    "Kochi Kerala",
    "AFKSHKJSHFRUFFNFW",
    "93242993434",
  );

  let anna = await addPendingInstitution("Anna University", "admin@anna.com");
  await addWallet(anna, "0x9f34u48f438u43r8u48343f89rf8j4");
  await addApplicationForm(
    anna,
    "Coimbatore Tamil Nadu",
    "HKJSHFRAFKSUFFNFW",
    "829934932483",
  );

  await addPendingInstitution("MG University", "admin@mg.com");

  let johndoe = await addStudent("John Doe", "john@doe.com");
  let john_onlinecourse = await addIssuedCertificate(
    ktu,
    ktuwallet,
    johndoe,
    "1",
    "Online Course",
    "ipfs://QmSm4DgMcfMjgnCUBb3ymTCF7Uehvixyf734baDnsqAw6A",
  );

  let john_diploma = await addIssuedCertificate(
    cusat,
    cusatwallet,
    johndoe,
    "2",
    "Diploma Certificate",
    "ipfs://QmdemTeuw5QcCHmwivGasgybPRmrjxznKtkKR2VjehuvoC",
  );

  await addPendingCertificate(
    ktu,
    ktuwallet,
    johndoe,
    "3",
    "Honor Certificate",
    "ipfs://QmX8qPLVyTxpNmBxrgCwVirRyBSVqDXDxKBdQbciL4Tqci",
  );

  let john_diploma2 = await addIssuedCertificate(
    ktu,
    ktuwallet,
    johndoe,
    "4",
    "Diploma Certificate",
    "ipfs://QmXTAKvDUcX13G743tgiBCqBQcZ9gQYGDpRWw9VcXH1TZt",
  );

  await addPendingCertificate(
    ktu,
    ktuwallet,
    johndoe,
    "5",
    "B.Tech Certificate",
    "ipfs://QmQsSUjcPAmzYqMjEvTvCx8ocCsSW5ohfNys3qB8i24vJ5",
  );

  let tcslink = await createSharedLink("TCS", johndoe);
  await addLinkEntries(tcslink.id, [john_onlinecourse.id]);
  let masterslink = await createSharedLink("Masters", johndoe);
  await addLinkEntries(masterslink.id, [john_diploma.id, john_diploma2.id]);

  let aronstark = await addStudent("Aron Stark", "aron@stark.com");

  await addIssuedCertificate(
    cusat,
    cusatwallet,
    aronstark,
    "6",
    "MOOC Course",
    "ipfs://QmaMAYb96egWGVpSUPDEgTBtDAip5rXeedP4nYneUn6KbN",
  );

  let aron_btech = await addIssuedCertificate(
    ktu,
    ktuwallet,
    aronstark,
    "7",
    "B.Tech Certificate",
    "ipfs://QmQNEyaumm1XZQnoUzWzBmDaHzbnsVQ7mPcW7VzpyTKnRk",
  );

  let mtechlink = await createSharedLink("M.Tech", aronstark);
  await addLinkEntries(mtechlink.id, [aron_btech.id]);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
