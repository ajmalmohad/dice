import { NextResponse } from "next/server";
import { getStudentPendingCredentails } from "@/components/utils/get-db-data";
import { authorizeUser, getErrorMessage } from "@/components/apiutils/common";

export async function GET() {
  try {
    await authorizeUser();
    let pendingCredentials = await getStudentPendingCredentails();
    return NextResponse.json({ data: pendingCredentials });
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
