"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";

export const FormData = ({
  className,
  submitForm,
}: {
  className?: string;
  submitForm: (data: any) => void;
}) => {
  let [formData, setFormData] = useState({
    institutionName: "",
    institutionAddress: "",
    licenseNumber: "",
    phoneNumber: "",
    email: "",
  });

  let validateSubmit = () => {
    if (
      formData.institutionName === "" ||
      formData.email === "" ||
      formData.institutionAddress === "" ||
      formData.licenseNumber === "" ||
      formData.phoneNumber === ""
    ) {
      submitForm({
        ...formData,
        error: true,
      });
    } else {
      submitForm({
        ...formData,
        error: false,
      });
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
        <Button onClick={validateSubmit} color="primary" size="lg">
          Submit
        </Button>
      </div>
    </div>
  );
};
