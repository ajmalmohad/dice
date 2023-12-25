import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { SignInWithGoogleButton } from "@/components/auth/google-auth";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/')

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] px-4">
      <Card className="p-4">
        <CardHeader className="p-4 flex-col items-start">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Please sign in</h1>
          <p className="text-sm md:text-base font-medium mb-4">To access the application you have to be authenticated</p>
        </CardHeader>
        <CardBody className="overflow-visible px-4">
          <SignInWithGoogleButton />
        </CardBody>
      </Card>
    </div>
  );
}