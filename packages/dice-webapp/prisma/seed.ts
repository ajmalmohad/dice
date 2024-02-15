import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  let password = await hash("john@doe.com", 12);
  await prisma.user.upsert({
    where: { email: "john@doe.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@doe.com",
      password,
      role: "STUDENT",
    },
  });

  password = await hash("admin@ktu.com", 12);
  await prisma.user.upsert({
    where: { email: "admin@ktu.com" },
    update: {},
    create: {
      name: "Kalam Technical University",
      email: "admin@ktu.com",
      password,
      role: "INSTITUTION",
    },
  });

  password = await hash("admin@cusat.com", 12);
  await prisma.user.upsert({
    where: { email: "admin@cusat.com" },
    update: {},
    create: {
      name: "Cochin University",
      email: "admin@cusat.com",
      password,
      role: "PENDING_INSTITUTION",
    },
  });

  password = await hash("admin@dice.com", 12);
  await prisma.user.upsert({
    where: { email: "admin@dice.com" },
    update: {},
    create: {
      name: "DICE Admin",
      email: "admin@dice.com",
      password,
      role: "ADMIN",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
