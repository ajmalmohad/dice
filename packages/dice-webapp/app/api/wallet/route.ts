import { NextResponse } from "next/server";
import { authorizeUser, getErrorMessage } from "@/components/apiutils/common";
import { getWallets } from "@/components/utils/get-db-data";

export async function GET() {
  try {
    await authorizeUser();
    const wallets = await getWallets();
    return NextResponse.json(wallets);
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
