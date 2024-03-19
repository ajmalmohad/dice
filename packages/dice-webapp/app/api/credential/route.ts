import { NextResponse } from "next/server";
import { getStudentActiveCredentails } from "@/components/utils/get-db-data";
import { authorizeUser, getErrorMessage } from "@/components/apiutils/common";

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
