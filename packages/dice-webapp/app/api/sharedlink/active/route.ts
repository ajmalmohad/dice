import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

let LinkSchema = z.object({
  linkId: z.string().min(1, { message: "Link ID is required" }),
  active: z.boolean(),
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
    let data = LinkSchema.parse(body);
    await checkExistingUser(user.email);

    const link = await prisma.sharedLink.findUnique({
      where: { id: data.linkId, userId: user.id },
    });

    if (!link) {
      throw new Error("Link not found");
    }

    await prisma.sharedLink.update({
      where: { id: data.linkId, userId: user.id },
      data: { active: data.active },
    });

    return NextResponse.json({
      message: "Link set to" + (data.active ? " active" : " inactive"),
    });
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
