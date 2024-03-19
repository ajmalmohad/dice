import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  selectedcreds: z
    .array(z.string())
    .min(1, { message: "Credential is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, formSchema);

    const link = await prisma.sharedLink.create({
      data: {
        linkName: body.name,
        userId: user.id,
        active: true,
        linkEntries: {
          create: body.selectedcreds.map((id: string) => {
            return {
              studentCredential: {
                connect: {
                  id,
                },
              },
            };
          }),
        },
      },
    });

    if (!link) throw new Error("Couldn't create link");
    return NextResponse.json({ message: "Link created" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
