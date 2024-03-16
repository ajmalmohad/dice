import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const CredSchema = z.object({
  id: z.string().min(1, { message: "Invalid id" }),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user || user.role !== "STUDENT") {
      throw new Error("Unauthorized");
    }

    const body = await req.json();
    if (!body) throw new Error("No body provided");
    CredSchema.parse(body);

    let cred = await prisma.studentCredentials.findUnique({
      where: {
        id: body.id,
        pending: true,
      },
    });

    if (!cred) throw new Error("Credential not found");
    if (cred.userId !== user.id) throw new Error("This credential does not belong to you");

    await prisma.studentCredentials.update({
      where: {
        id: body.id,
      },
      data: {
        pending: false,
      },
    });

    return NextResponse.json({ message: "Credential accepted" });
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
