import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

const roles = ["STUDENT", "INSTITUTION", "ADMIN"];

type UserBody = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const validateRequestBody = (body: UserBody) => {
  const { name, email, password, role } = body;
  if (!name || !email || !password || !role) {
    throw new Error("Missing required fields");
  }
  if (!roles.includes(role)) {
    throw new Error("Invalid role");
  }
};

const checkExistingUser = async (email: string) => {
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    throw new Error("User already exists");
  }
};

const createUser = async (body: UserBody) => {
  const { name, email, password, role } = body;
  const hashedPassword = await hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    validateRequestBody(body);
    await checkExistingUser(body.email);
    const user = await createUser(body);
    return NextResponse.json({ user: user });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
