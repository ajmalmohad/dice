import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { SignInWithGoogleButton } from "@/components/auth/google-auth";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/')

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] px-4">
      <Card className="p-4 bg-gradient-to-r dark:from-[#151523] dark:via-[#101118] dark:to-[#151523] border border-solid border-1 border-slate-600">
        <CardHeader className="p-4 flex-col items-start">
          <div className="relative w-full flex items-center justify-center mb-[40px] mt-[20px]">
            <div className="absolute w-[100px] h-[100px] rounded-full border-1 animate-spin border-dashed border-blue-800 dark:border-blue-200"></div>
            <Image className="filter dark:invert" alt="Fingerprint" src="/auth/fingerprint.svg" width={64} height={64} />
          </div>
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