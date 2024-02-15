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

const FormSchema = z.object({
  beneficiaryEmail: z.string().email({ message: "Invalid email address" }),
  certificateType: z.string().min(1, { message: "Certificate type is required" }),
  certificateFile: z.string().min(1, { message: "Certificate file is required" }),
});

export const IssueFormInputs = ({
  className,
  submitForm,
}: {
  className?: string;
  submitForm: (data: any) => void;
}) => {
  const { toast } = useToast();
  let [formData, setFormData] = useState({
    beneficiaryEmail: "",
    certificateType: "",
    certificateFile: "",
  });

  let validateSubmit = () => {
    try {
      FormSchema.parse(formData);
      submitForm({
        ...formData,
        error: false,
      });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        submitForm({
          ...formData,
          error: true,
        });

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
        <Button className="p-6" color="primary">
          Verify
        </Button>
      </div>
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
              <SelectItem value="apple">Online Course</SelectItem>
              <SelectItem value="banana">Degree</SelectItem>
              <SelectItem value="blueberry">School</SelectItem>
              <SelectItem value="grapes">Award</SelectItem>
              <SelectItem value="pineapple">Competitive Exam</SelectItem>
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
        <Button onClick={validateSubmit} color="primary" className="p-6">
          Submit
        </Button>
      </div>
    </div>
  );
};
