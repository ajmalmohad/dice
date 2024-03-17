import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { getErrorMessage, getParsedBody } from "@/components/apiutils/common";

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z
    .string()
    .refine((role) => ["STUDENT", "PENDING_INSTITUTION"].includes(role), {
      message: "Role must be STUDENT or PENDING_INSTITUTION",
    }),
});

const createUser = async (body: any) => {
  const { name, email, password, role } = body;
  const hashedPassword = await hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export async function POST(req: NextRequest) {
  try {
    const body = await getParsedBody(req, userSchema);

    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) throw new Error("User already exists");

    const user = await createUser(body);
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
