import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

let ImageSchema = z.object({
  image: z.string().url({ message: "Invalid image URL" }),
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
    let data = ImageSchema.parse(body);
    await checkExistingUser(user.email);
    await prisma.user.update({
      where: { email: user.email },
      data: { image: data.image },
    });
    return NextResponse.json({ message: "Image updated" });
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

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      throw new Error("Unauthorized");
    }

    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!existing) {
      throw new Error("User does not exist");
    }
    return NextResponse.json({ image: existing.image });
  } catch (e: unknown) {
    let errorMessage = "An unknown error occurred";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
