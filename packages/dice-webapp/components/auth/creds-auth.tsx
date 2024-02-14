"use client";

import { SignInResponse, signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

const User = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function SignInWithCreds() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const userData = {
      email,
      password,
    };

    try {
      User.parse(userData);

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((response: SignInResponse | undefined) => {
        if (response?.ok) {
          window.location.replace("/auth/login");
        } else {
          toast({
            variant: "destructive",
            title: "Your request failed.",
            description: "User not found. Please try again.",
          });
        }
      });
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
      <Button onClick={handleSubmit} className="rounded-md mb-4 flex items-center">
        <p className="text-sm md:text-base">Submit</p>
      </Button>
    </>
  );
}

export function SignOutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
      className="font-medium"
    >
      Sign Out
    </Button>
  );
}