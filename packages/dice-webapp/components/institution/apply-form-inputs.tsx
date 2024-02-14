"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  institutionName: z.string().min(1, { message: "Institution name is required" }),
  institutionAddress: z.string().min(1, { message: "Institution address is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  phoneNumber: z.string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
  email: z.string().email({ message: "Invalid email address" }),
});

export const ApplyFormInputs = ({
  className,
  submitForm,
}: {
  className?: string;
  submitForm: (data: any) => void;
}) => {
  const { toast } = useToast();

  let [formData, setFormData] = useState({
    institutionName: "",
    institutionAddress: "",
    licenseNumber: "",
    phoneNumber: "",
    email: "",
  });

  let validateSubmit = () => {
    try {
      FormSchema.parse(formData);
      submitForm({
        ...formData,
        error: false,
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        submitForm({
          ...formData,
          error: true,
        });
        
        toast({
          title: "Validation Error",
          variant: "destructive",
          description: e.errors[0].message,
        })
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
        <Input
          className="p-6"
          type="email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          placeholder="Enter email"
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
        <Button onClick={validateSubmit} color="primary" className="p-6">
          Submit
        </Button>
      </div>
    </div>
  );
};
