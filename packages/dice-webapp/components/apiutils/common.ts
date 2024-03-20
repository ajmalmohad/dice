import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ZodError, ZodObject, z } from "zod";
import { NextRequest } from "next/server";

export async function authorizeUser() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) throw new Error("Unauthorized");
  return user;
}

export function getErrorMessage(e: unknown) {
  let errorMessage = "An unknown error occurred";
  if (e instanceof ZodError) {
    errorMessage = e.errors[0].message;
  } else if (e instanceof Error) {
    errorMessage = e.message;
  }
  return errorMessage;
}

export async function getParsedBody(req: NextRequest, schema: ZodObject<any>) {
  const body = await req.json();
  if (!body) throw new Error("No body provided");
  return schema.parse(body);
}
