import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  authorizeUser,
  getErrorMessage,
  getParsedBody,
} from "@/components/apiutils/common";

let linkSchema = z.object({
  linkId: z.string().min(1, { message: "Link ID is required" }),
  active: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authorizeUser();
    const body = await getParsedBody(req, linkSchema);

    const link = await prisma.sharedLink.findUnique({
      where: { id: body.linkId, userId: user.id },
    });

    if (!link) throw new Error("Link not found");

    await prisma.sharedLink.update({
      where: { id: body.linkId },
      data: { active: body.active },
    });

    return NextResponse.json({
      message: "Link set to" + (body.active ? " active" : " inactive"),
    });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
