"use client";

import { IssueFormInputs } from "@/components/institution/issue-form-inputs";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useWeb3 } from "../auth/web3-provider";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  credentialId: z.number().min(1, { message: "Credential ID is required" }),
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
  const { contract, address } = useWeb3();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  if (status === "unauthenticated") return "You don't have access to this page";

  const uploadCertificateToIPFS = async () => {
    return "https://ipfs.io/ipfs/0x4IORF894F9";
  };

  const uploadMetadataToIPFS = async ({
    certificateLink,
    certificateType,
  }: {
    certificateLink: string;
    certificateType: string;
  }) => {
    return "https://ipfs.io/ipfs/0x4IORF894F9";
  };

  let getWalletId = async (email: string) => {
    if (!email) return;
    let res = await fetch("/api/wallet/user", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let response = await res.json();
    return response.wallet;
  };

  const submitForm = async (data: any) => {
    setLoading(true);
    let metadataLink = "";
    data.issuerWallet = address;
    try {
      const certificateLink = await uploadCertificateToIPFS();
      metadataLink = await uploadMetadataToIPFS({
        certificateLink,
        certificateType: data.certificateType,
      });
    } catch (e: unknown) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      let email = await getWalletId(data.beneficiaryEmail);
      let res = await contract.methods
        .issueCertificate(email, metadataLink)
        .send({
          from: address,
        });
      data.transactionId = res.transactionHash;
      let credentialId = await contract.methods
        .getCurrentCertificateId()
        .call();
      data.credentialId = parseInt(credentialId);
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      formSchema.parse(data);
    } catch (e) {
      const error = e as z.ZodError;
      toast({
        title: "Error",
        description: error.errors[0].message,
        variant: "destructive",
      });
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
    console.log(response);

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
