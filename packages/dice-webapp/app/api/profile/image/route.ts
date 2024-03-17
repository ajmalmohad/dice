import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

let imageSchema = z.object({
  image: z.string().url({ message: "Invalid image URL" }),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, imageSchema);
    await prisma.user.update({
      where: { email: user.email },
      data: { image: body.image },
    });

    return NextResponse.json({ message: "Image updated" });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    const user = await authorizeUser();
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existing) throw new Error("User does not exist");
    return NextResponse.json({ image: existing.image });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
