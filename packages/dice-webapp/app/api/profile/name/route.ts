import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

let NameSchema = z.object({
  name: z.string().min(2).max(30),
});

let checkExistingUser = async (email: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    throw new Error("User does not exist");
  }
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      throw new Error("Unauthorized");
    }

    const body = await req.json();
    let data = NameSchema.parse(body);
    await checkExistingUser(user.email);
    await prisma.user.update({
      where: { email: user.email },
      data: { name: data.name },
    });
    return NextResponse.json({ message: "Name updated" });
  } catch (e: unknown) {
    let errorMessage = "An unknown error occurred";
    if (e instanceof ZodError) {
      errorMessage = e.errors[0].message;
    } else if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
