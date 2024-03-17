import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      throw new Error("Unauthorized");
    }

    const sharedLinks = await prisma.sharedLink.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        linkName: true,
        active: true,
      },
    });

    return NextResponse.json(sharedLinks);
  } catch (e: unknown) {
    let errorMessage = "An unknown error occurred";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
