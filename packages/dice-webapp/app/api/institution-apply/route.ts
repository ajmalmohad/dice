import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const formSchema = z.object({
  institutionName: z
    .string()
    .min(1, { message: "Institution name is required" }),
  institutionAddress: z
    .string()
    .min(1, { message: "Institution address is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
});

const createApplication = async (body: any) => {
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) throw new Error("Sender doesn't match any users");

  let existingWallet = await prisma.wallets.findUnique({
    where: { walletID: body.address },
  });

  if (!existingWallet) throw new Error("Wallet doesn't exists");

  await prisma.applicationForm.create({
    data: {
      institutionName: body.institutionName,
      institutionAddress: body.institutionAddress,
      licenseNumber: body.licenseNumber,
      email: body.email,
      phoneNumber: body.phoneNumber,
      userId: user.id,
    },
  });

  return NextResponse.json({ message: "Application created successfully" });
};

export async function POST(req: NextRequest) {
  try {
    await authorizeUser();
    const body = await getParsedBody(req, formSchema);
    const application = await createApplication(body);
    return NextResponse.json(application);
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
