"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const User = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z
    .string()
    .refine((role) => ["STUDENT", "PENDING_INSTITUTION"].includes(role), {
      message: "Role must be STUDENT or PENDING_INSTITUTION",
    }),
});

export function RegisterWithCreds() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const { toast } = useToast();

  const handleSubmit = async () => {
    console.log("client side validation");

    const userData = {
      name,
      email,
      password,
      role: isStudent ? "STUDENT" : "PENDING_INSTITUTION",
    };

    try {
      User.parse(userData);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Your request was successful.",
          description: "User created.",
        });
      } else {
        let data = await res.json();

        toast({
          variant: "destructive",
          title: "Your request failed.",
          description: data.error,
        });
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        e.errors.forEach((error) => {
          toast({
            variant: "destructive",
            title: "Validation error",
            description: error.message,
          });
        });
      }
    }
  };

  return (
    <>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
        className="mb-4"
      />
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
        className="mb-4"
      />
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        className="mb-4"
      />
      <Select
        value={isStudent ? "student" : "institution"}
        onValueChange={(val) => {
          setIsStudent(val === "student");
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="institution">Institution</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={handleSubmit}
        className="rounded-md mb-4 flex items-center mt-4"
      >
        <p className="text-sm md:text-base">Submit</p>
      </Button>
    </>
  );
}
