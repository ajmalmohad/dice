import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IoIosWarning } from "react-icons/io";
import { SignInWithCreds } from "@/components/auth/creds-auth";
import { Toaster } from "@/components/ui/toaster";

export default async function Page() {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] px-4">
      <Card className="max-w-[500px] sm:w-[60%] p-4 border-primary dark:border-border">
        <CardHeader className="p-4 flex-col items-start">
          <div className="relative w-full flex items-center justify-center mb-[40px] mt-[20px]">
            <div className="absolute w-[100px] h-[100px] rounded-full border-1 animate-spin border-dashed border-blue-800 dark:border-blue-200"></div>
            <Image
              className="filter dark:invert"
              alt="Fingerprint"
              src="/auth/fingerprint.svg"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Please sign in
          </h1>
          <p className="text-sm md:text-base font-medium mb-4">
            To access the application you have to be authenticated
          </p>
        </CardHeader>
        <CardContent className="overflow-visible px-4 w-full flex flex-col">
          <SignInWithCreds />
          <div className="mb-4 flex">
            <p>Haven&apos;t registered?</p>
            <a href="/auth/register" className="ml-1 text-teal-500">
              Register
            </a>
          </div>
          <div className="p-2 text-sm rounded-md bg-amber-400/20 text-amber-600 dark:bg-amber-400/40 dark:text-amber-400">
            <span className="float-left text-lg mr-1">
              <IoIosWarning />
            </span>
            <p>
              You&apos;ll be automatically signed in to the role you selected
              during registration.
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
