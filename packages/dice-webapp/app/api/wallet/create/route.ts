import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const formSchema = z.object({
  walletAddress: z.string().min(1, { message: "Wallet address is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, formSchema);

    let existing = await prisma.wallets.findFirst({
      where: {
        walletID: body.walletAddress,
      },
    });

    if (existing) throw new Error("Wallet already used by another user");

    await prisma.wallets.create({
      data: {
        walletID: body.walletAddress,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Wallet Added" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
