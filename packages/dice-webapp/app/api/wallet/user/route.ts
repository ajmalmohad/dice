import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const formSchema = z.object({
  email: z.string().min(1, { message: "email address is required" }),
});

export async function POST(req: NextRequest) {
  try {
    await authorizeUser();
    const body = await getParsedBody(req, formSchema);

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        role: "STUDENT",
      },
    });

    if (!user) throw new Error("User not found");

    const wallet = await prisma.wallets.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!wallet) throw new Error("Wallet not found");

    return NextResponse.json({
      wallet: wallet.walletID,
      name: user.name,
    });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
