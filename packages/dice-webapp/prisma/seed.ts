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

async function addWallet(institution: User, walletId: string) {
  await prisma.wallets.create({
    data: {
      walletID: walletId,
      userId: institution.id,
    },
  });
}

async function main() {
  let student1 = await addStudent("John Doe", "john@doe.com");

  await addWallet(student1, "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");

  let institution1 = await addPendingInstitution(
    "Kalam Technical University",
    "admin@ktu.com",
  );

  await addPendingInstitution(
    "Cochin University",
    "admin@cusat.com",
  );

  await addApplicationForm(
    institution1,
    "Trivandrum Kerala",
    "JSHAFKSHKFRUFFNFW",
    "45898345934",
  );

  await addWallet(institution1, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");

  await addAdmin("Admin", "admin@dice.com");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
