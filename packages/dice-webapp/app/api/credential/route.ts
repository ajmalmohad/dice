import { NextRequest, NextResponse } from "next/server";
import { getStudentActiveCredentails } from "@/components/utils/get-db-data";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";
import { z } from "zod";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await authorizeUser();
    let activeCredentials = await getStudentActiveCredentails();
    return NextResponse.json(activeCredentials);
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

const formSchema = z.object({
  beneficiaryEmail: z.string().email({ message: "Invalid email address" }),
  certificateType: z
    .string()
    .min(1, { message: "Certificate type is required" }),
  certificateFile: z
    .string()
    .min(1, { message: "Certificate file is required" }),
  issuerWallet: z.string().min(1, { message: "Issuer wallet is required" }),
  transactionId: z.string().min(1, { message: "Transaction ID is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, formSchema);
    let beneficiary = await prisma.user.findUnique({
      where: {
        email: body.beneficiaryEmail,
        role: "STUDENT",
      },
    });

    if (!beneficiary) throw new Error("Beneficiary not found");

    let credential = await prisma.studentCredentials.create({
      data: {
        credentialType: body.certificateType,
        credentialLink: body.certificateFile,
        issuerWallet: body.issuerWallet,
        transactionId: body.transactionId,
        issueDate: new Date(),
        verified: false,
        issuerId: user.id,
        userId: beneficiary.id,
        pending: true,
      },
    });

    if (!credential) throw new Error("Credential not created");

    return NextResponse.json({ message: "Credential created" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
