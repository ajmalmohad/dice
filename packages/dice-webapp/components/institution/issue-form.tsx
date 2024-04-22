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
  certificateFile: z.instanceof(File),
  issuerWallet: z.string().min(1, { message: "Issuer wallet is required" }),
  transactionId: z.string().min(1, { message: "Transaction ID is required" }),
});

export const IssueCredentialForm = () => {
  const { status } = useSession();
  const { contract, address } = useWeb3();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  if (status === "unauthenticated") return "You don't have access to this page";

  const uploadCertificateToIPFS = async (fileToUpload: File) => {
    try {
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/ipfs/file-upload", {
        method: "POST",
        body: data,
      });
      if (res.status === 200) {
        const IpfsHash = await res.json();
        return IpfsHash;
      } else {
        toast({
          title: "Error",
          description: "Couldn't upload file",
          variant: "destructive",
        });
      }
      return null;
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Trouble uploading file",
        variant: "destructive",
      });
      return null;
    }
  };

  const uploadMetadataToIPFS = async ({
    certificateLink,
    certificateType,
  }: {
    certificateLink: string;
    certificateType: string;
  }) => {
    try {
      const res = await fetch("/api/ipfs/metadata-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certificateLink, certificateType }),
      });

      if (res.status === 200) {
        const IpfsHash = await res.json();
        return IpfsHash;
      } else {
        toast({
          title: "Error",
          description: "Couldn't upload file",
          variant: "destructive",
        });
      }
      return null;
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Trouble uploading file",
        variant: "destructive",
      });
      return null;
    }
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
    let certificateLink = "";
    let metadataLink = "";
    data.issuerWallet = address;
    setLoading(true);
    try {
      certificateLink = await uploadCertificateToIPFS(data.certificateFile);
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
      if(!email || !metadataLink) throw new Error("Couldn't get all params for contract")
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

    data.certificateFile = "ipfs://" + certificateLink;

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
    } else {
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    }
    setLoading(false);
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
