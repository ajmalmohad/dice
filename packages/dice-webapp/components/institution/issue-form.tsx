"use client";

import { IssueFormInputs } from "@/components/institution/issue-form-inputs";
import { useSession } from "next-auth/react";
import { Toaster } from "../ui/toaster";

export const IssueCredentialForm = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return "You don't have access to this page";

  const submitForm = (data: any) => {
    console.log(data);
    console.log("submitted");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Issue Credential</h1>
      <IssueFormInputs className="w-full my-6" submitForm={submitForm} />
      <div className="mt-6">
        <p className="text-ring text-center">
          You are issuing a credential to a student via blockchain
        </p>
      </div>
      <Toaster />
    </div>
  );
};
