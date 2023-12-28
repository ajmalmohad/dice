import { serverSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInWithGoogleButton } from "@/components/auth/google-auth";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { IoIosWarning } from "react-icons/io";

export default async function Page() {
  const session = await serverSession();

  if (session && session.user.role === "STUDENT") redirect("/student");
  else if (session && session.user.role === "INSTITUTION")
    redirect("/institution");
  else if (session && session.user.role === "ADMIN") redirect("/admin");
  else if (session && session.user.role === "PENDING_INSTITUTION")
    redirect("/institution/pending");

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] px-4">
      <Card className="max-w-[500px] p-4 bg-gradient-to-r from-[#DBE6F6] to-[#A7BFE8] dark:bg-gradient-to-r dark:from-[#151523] dark:via-[#101118] dark:to-[#151523] border border-solid border-1 border-slate-600">
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
        <CardBody className="overflow-visible px-4">
          <SignInWithGoogleButton />
          <div className="p-2 text-sm rounded-md bg-amber-400/20 text-amber-600 dark:bg-amber-400/40 dark:text-amber-400">
            <span className="float-left text-lg mr-1">
              <IoIosWarning />
            </span>
            <p>
              Once you login as an institution, you will not be able to use that
              account to login as a student, and vice versa.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
