"use client";

import { ApplyFormInputs } from "@/components/institution/apply-form-inputs";
import { useSession } from "next-auth/react";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";

export const ApplicationForm = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return "You don't have access to this page";

  const submitForm = async (data: any) => {
    if (!data.error) {
      data.email = session?.user?.email;
      if (!data.email) {
        toast({
          variant: "destructive",
          title: "Your request failed.",
          description: "You must have a session email to apply",
        });
        return;
      }

      const res = await fetch("/api/institution-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        window.location.reload();
      } else {
        const data = await res.json();

        toast({
          variant: "destructive",
          title: "Your request failed.",
          description: data.error,
        });
      }
    }
  };

  return (
    <div className="m-auto flex flex-col items-center p-[20px] md:p-[40px] max-w-[1000px]">
      <div className="py-6">
        <h1 className="text-3xl font-semibold">Register as an Institution</h1>
      </div>
      <ApplyFormInputs className="w-full my-6" submitForm={submitForm} />
      <div className="mt-6">
        <p className="text-ring text-center">
          By registering you agree to our terms and conditions
        </p>
      </div>
      <Toaster />
    </div>
  );
};
