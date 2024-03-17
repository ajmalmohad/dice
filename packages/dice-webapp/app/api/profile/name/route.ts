import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

let nameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, nameSchema);
    await prisma.user.update({
      where: { email: user.email },
      data: { name: body.name },
    });

    return NextResponse.json({ message: "Name updated" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
