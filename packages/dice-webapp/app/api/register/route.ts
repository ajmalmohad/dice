import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { z, ZodError } from "zod";

const User = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  role: z.string().refine(
    (role) => ["STUDENT", "PENDING_INSTITUTION"].includes(role),
    { message: "Role must be STUDENT or PENDING_INSTITUTION" }
  ),
});

const checkExistingUser = async (email: string) => {
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    throw new Error("User already exists");
  }
};

const createUser = async (body: any) => {
  const { name, email, password, role } = body;
  const hashedPassword = await hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let user = User.parse(body);
    await checkExistingUser(body.email);
    user = await createUser(body);
    return NextResponse.json({ user: user });
  } catch (e: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (e instanceof ZodError) {
      errorMessage = e.errors[0].message;
    } else if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}