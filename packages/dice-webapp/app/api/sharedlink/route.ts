import { NextResponse } from "next/server";
import { authorizeUser, getErrorMessage } from "@/components/apiutils/common";
import { getStudentSharedLinks } from "@/components/utils/get-db-data";

export async function GET() {
  try {
    await authorizeUser();
    const sharedLinks = await getStudentSharedLinks();
    return NextResponse.json(sharedLinks);
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
