"use client";

import { IssueFormInputs } from "@/components/institution/issue-form-inputs";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useWeb3 } from "../auth/web3-provider";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  beneficiaryEmail: z.string().email({ message: "Invalid email address" }),
  certificateType: z
    .string()
    .min(1, { message: "Certificate type is required" }),
  certificateFile: z
    .string()
    .min(1, { message: "Certificate file is required" }),
  issuerWallet: z.string().min(1, { message: "Issuer wallet is required" }),
  transactionId: z.string().min(1, { message: "Transaction ID is required" }),
});

export const IssueCredentialForm = () => {
  const { status } = useSession();
  const { address } = useWeb3();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  if (status === "unauthenticated") return "You don't have access to this page";

  const submitForm = async (data: any) => {
    setLoading(true);
    // TODO: Issue the certificate on blockchain
    data.issuerWallet = address;
    data.transactionId = "0x4IORF894F9";

    try {
      FormSchema.parse(data);
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        console.log(e);

        toast({
          title: "Error",
          description: e.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred",
          variant: "destructive",
        });
      }
      setLoading(false);
      return;
    }

    let res = await fetch("/api/credential", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let response = await res.json();

    if (res.ok) {
      toast({
        title: "Success",
        description: "Credential issued",
      });
      setLoading(false);
    } else {
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Issue Credential</h1>
      <IssueFormInputs
        className="w-full my-6"
        loading={loading}
        submitForm={submitForm}
      />
      <div className="mt-6">
        <p className="text-ring text-center">
          You are issuing a credential to a student via blockchain
        </p>
      </div>
    </div>
  );
};
