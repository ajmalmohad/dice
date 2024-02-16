import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const FormSchema = z.object({
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
  senderEmail: z.string().email({ message: "Invalid sender email address" }),
});

const createApplication = async (body: any) => {
  const user = await prisma.user.findUnique({
    where: { email: body.senderEmail },
  });
  if (!user) {
    throw new Error("Sender email doesn't match any users");
  }
  return await prisma.applicationForm.create({
    data: {
      institutionName: body.institutionName,
      institutionAddress: body.institutionAddress,
      licenseNumber: body.licenseNumber,
      email: body.email,
      phoneNumber: body.phoneNumber,
      userId: user.id,
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user || user.role !== "PENDING_INSTITUTION") {
      throw new Error("Unauthorized");
    }

    const body = await req.json();
    if (!body) throw new Error("No body provided");
    FormSchema.parse(body);
    const application = await createApplication(body);
    return NextResponse.json(application);
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
