import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const formSchema = z.object({
  requestId: z
    .string()
    .min(1, { message: "Institution request id is required" }),
});

export async function POST(req: NextRequest) {
  try {
    await authorizeUser();
    let body = await getParsedBody(req, formSchema);

    let request = await prisma.applicationForm.findUnique({
      where: { id: body.requestId },
    });

    if (!request) throw new Error("Request not found");

    let existsRejected = await prisma.rejectedInstitution.findFirst({
      where: { email: request.email },
    });

    if (existsRejected) {
      await prisma.rejectedInstitution.delete({
        where: { id: existsRejected.id },
      });
    }

    await prisma.user.update({
      where: { id: request.userId },
      data: { role: "INSTITUTION" },
    });

    return NextResponse.json({ message: "Institution request accepted" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
