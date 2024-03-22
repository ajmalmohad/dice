"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { ConnectWeb3Wallet } from "../web3/connect-web3-wallet";
import { useWeb3 } from "../auth/web3-provider";

const formSchema = z.object({
  institutionName: z
    .string()
    .min(1, { message: "Institution name is required" }),
  institutionAddress: z
    .string()
    .min(1, { message: "Institution address is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  address: z.string().min(1, { message: "Address is required" }),
});

export const ApplyFormInputs = ({
  className,
  submitForm,
}: {
  className?: string;
  submitForm: (data: any) => void;
}) => {
  const { toast } = useToast();
  let { contract, address } = useWeb3();

  let [formData, setFormData] = useState({
    institutionName: "",
    institutionAddress: "",
    licenseNumber: "",
    phoneNumber: "",
    address: "",
  });

  let validateSubmit = () => {
    try {
      if (!address) {
        toast({
          title: "Validation Error",
          variant: "destructive",
          description: "Please connect your wallet",
        });
        return;
      }
      formData.address = address;
      formSchema.parse(formData);
      submitForm({
        ...formData,
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
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
            setFormData({ ...formData, institutionName: e.target.value });
          }}
          placeholder="Enter name"
        />
      </div>
      <div>
        <Textarea
          className="p-6"
          onChange={(e) => {
            setFormData({ ...formData, institutionAddress: e.target.value });
          }}
          placeholder="Enter address"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Input
          className="p-6"
          onChange={(e) => {
            setFormData({ ...formData, licenseNumber: e.target.value });
          }}
          type="text"
          placeholder="Enter license number"
        />
        <Input
          className="p-6"
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber: e.target.value });
          }}
          type="phone"
          placeholder="Enter phone number"
        />
      </div>

      <div className="flex justify-end">
        <ConnectWeb3Wallet />
        <Button
          disabled={!contract}
          onClick={validateSubmit}
          color="primary"
          className="mt-2 ml-2"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
