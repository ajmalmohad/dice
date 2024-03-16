import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStudentPendingCredentails } from "@/components/utils/get-db-data";

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

    let pendingCredentials = await getStudentPendingCredentails();

    return NextResponse.json({ data: pendingCredentials });
  } catch (e: unknown) {
    let errorMessage = "An unknown error occurred";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
