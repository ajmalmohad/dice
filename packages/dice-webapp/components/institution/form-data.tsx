"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
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
          type="text"
          onValueChange={(val) => {
            setFormData({ ...formData, institutionName: val });
          }}
          isRequired
          size="lg"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter name"
          label="Institution Name"
        />
        <Input
          type="email"
          onValueChange={(val) => {
            setFormData({ ...formData, email: val });
          }}
          isRequired
          size="lg"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter email"
          label="Institution Email"
        />
      </div>
      <div>
        <Textarea
          onValueChange={(val) => {
            setFormData({ ...formData, institutionAddress: val });
          }}
          isRequired
          minRows={4}
          maxRows={10}
          size="lg"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter address"
          label="Institution Address"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Input
          onValueChange={(val) => {
            setFormData({ ...formData, licenseNumber: val });
          }}
          type="text"
          isRequired
          size="lg"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter license number"
          label="Institution License Number"
        />
        <Input
          onValueChange={(val) => {
            setFormData({ ...formData, phoneNumber: val });
          }}
          type="phone"
          isRequired
          size="lg"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter phone number"
          label="Institution Phone Number"
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
