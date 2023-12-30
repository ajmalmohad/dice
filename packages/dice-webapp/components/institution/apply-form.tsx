"use client";

import { FormData } from "@/components/institution/form-data";
import { useSession } from "next-auth/react";

export const ApplicationForm = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return "You don't have access to this page";

  const submitForm = (data: any) => {
    if (data.error) console.log("Error in form");
    else {
      data.senderEmail = session?.user?.email;
      if (!data.senderEmail) return;

      fetch("/api/register-institution", {
        method: "POST",
        headers: {
          "Accept": "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="m-auto flex flex-col items-center p-[20px] md:p-[40px] max-w-[1000px]">
      <div className="py-6">
        <h1 className="text-3xl font-semibold">Register as an Institution</h1>
      </div>
      <FormData className="w-full my-6" submitForm={submitForm} />
      <div className="mt-6">
        <p className="text-slate-400 text-center">
          By registering you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};
