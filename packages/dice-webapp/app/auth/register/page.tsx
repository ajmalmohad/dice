import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { IoIosWarning } from "react-icons/io";
import { RegisterWithCreds } from "@/components/auth/register-auth";
import { Toaster } from "@/components/ui/toaster";

export default async function Page() {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] px-4">
      <Card className="max-w-[500px] p-4 border-primary dark:border-border">
        <CardHeader className="p-4 flex-col items-start">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Register</h1>
        </CardHeader>
        <CardContent className="overflow-visible px-4 w-full flex flex-col">
          <RegisterWithCreds />
          <div className="p-2 text-sm rounded-md bg-amber-400/20 text-amber-600 dark:bg-amber-400/40 dark:text-amber-400">
            <span className="float-left text-lg mr-1">
              <IoIosWarning />
            </span>
            <p>
              Once you login as an institution, you will not be able to use that
              account to login as a student, and vice versa.
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
