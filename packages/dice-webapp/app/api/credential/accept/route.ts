import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const credentialSchema = z.object({
  id: z.string().min(1, { message: "Invalid id" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, credentialSchema);

    let cred = await prisma.studentCredentials.findUnique({
      where: {
        id: body.id,
        pending: true,
      },
    });

    if (!cred) throw new Error("Credential not found");
    if (cred.userId !== user.id) throw new Error("The credential is not yours");

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
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
