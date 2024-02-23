import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function addUser(name: string, email: string, password:string, role: string) {
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

async function addStudent(name: string, email: string) {
  return await addUser(name, email, email, "STUDENT");
}

async function addInstitution(name: string, email: string) {
  return await addUser(name, email, email, "INSTITUTION");
}

async function addPendingInstitution(name: string, email: string) {
  return await addUser(name, email, email, "PENDING_INSTITUTION");
}

async function addAdmin(name: string, email: string) {
  return await addUser(name, email, email, "ADMIN");
}

async function addWallet(userId: string, walletID: string) {
  await prisma.wallets.upsert({
    where: { walletID },
    update: {},
    create: {
      walletID,
      userId,
    },
  });
}

async function main() {
  let student1 = await addStudent("John Doe", "john@doe.com");
  await addWallet(student1.id, "0x1233489809238948932");
  await addWallet(student1.id, "0x8980923812334948933");

  let institution1 = await addInstitution("Kalam Technical University", "admin@ktu.com");
  await addWallet(institution1.id, "0x2389482334189809932");
  
  await addInstitution("Kerala University", "admin@kerala.com");
  await addPendingInstitution("Cochin University", "admin@cusat.com");
  await addAdmin("Admin", "admin@dice.com");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
