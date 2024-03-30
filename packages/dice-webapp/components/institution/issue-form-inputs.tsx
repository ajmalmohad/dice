"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z, ZodError } from "zod";
import { useToast } from "../ui/use-toast";
import { useWeb3 } from "../auth/web3-provider";

type Beneficiary = {
  name: string;
  wallet: string;
};

const formSchema = z.object({
  beneficiaryEmail: z.string().email({ message: "Invalid email address" }),
  certificateType: z
    .string()
    .min(1, { message: "Certificate type is required" }),
  certificateFile: z
    .string()
    .min(1, { message: "Certificate file is required" }),
});

let beneficiarySchema = z.object({
  name: z.string(),
  wallet: z.string(),
});

export const IssueFormInputs = ({
  className,
  loading,
  submitForm,
}: {
  className?: string;
  loading: boolean;
  submitForm: (data: any) => void;
}) => {
  const { toast } = useToast();
  let { contract } = useWeb3();
  let [formData, setFormData] = useState({
    beneficiaryEmail: "",
    certificateType: "",
    certificateFile: "",
  });
  let [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);

  let verifyEmail = async (email: string) => {
    if (!email) return;
    let res = await fetch("/api/wallet/user", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let response = await res.json();

    if (res.ok) {
      let data = beneficiarySchema.parse(response);
      setBeneficiary(data);
    } else {
      setBeneficiary(null);
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    }
  };

  let validateSubmit = () => {
    try {
      formSchema.parse(formData);
      submitForm({
        ...formData,
        error: false,
      });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        toast({
          title: "Validation Error",
          variant: "destructive",
          description: e.errors[0].message,
        });
      }
    }
  };

  return (
    <div className={className + " flex flex-col gap-6"}>
      <div className="flex flex-col sm:flex-row gap-6">
        <Input
          className="p-6"
          type="text"
          onChange={(e) => {
            setFormData({ ...formData, beneficiaryEmail: e.target.value });
          }}
          placeholder="Enter email of beneficiary"
        />
        <Button
          className="p-6"
          color="primary"
          onClick={() => verifyEmail(formData.beneficiaryEmail)}
        >
          Verify
        </Button>
      </div>
      {beneficiary && (
        <div className="p-6 border rounded-md">
          <p>
            <strong>Name:</strong> {beneficiary.name}
          </p>
          <p>
            <strong>Wallet ID:</strong> {beneficiary.wallet}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-6">
        <Select
          onValueChange={(val) => {
            setFormData({ ...formData, certificateType: val });
          }}
        >
          <SelectTrigger className="flex-1 p-6">
            <SelectValue placeholder="Select certificate type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Certificate Type</SelectLabel>
              <SelectItem value="Online Course">Online Course</SelectItem>
              <SelectItem value="Degree">Degree</SelectItem>
              <SelectItem value="School">School</SelectItem>
              <SelectItem value="Award">Award</SelectItem>
              <SelectItem value="Competitive Exam">Competitive Exam</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex-1 p-4 sm:p-3 border rounded-md">
          <Input
            className="border-none p-0 m-0 h-auto"
            onChange={(e) => {
              setFormData({ ...formData, certificateFile: e.target.value });
            }}
            type="file"
            placeholder="Upload the credential"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={contract === null || loading}
          onClick={validateSubmit}
          color="primary"
          className="p-6"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
