import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("johndoe", 12);
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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
