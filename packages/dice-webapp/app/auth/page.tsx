import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { SignInWithGoogleButton } from "@/components/auth/google-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(session) redirect('/')
  
  return (
    <div>
      <SignInWithGoogleButton />
    </div>
  );
}