"use client";

import { SignInResponse, signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "@/components/ui/use-toast";

export function SignInWithCreds() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

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
      <Button
        onClick={async () => {
          if (email === "" || password === "") {
            return;
          }

          await signIn("credentials", {
            email,
            password,
            redirect: false,
          }).then((response: SignInResponse | undefined) => {
            if (response?.ok) {
              window.location.replace("/auth/login");
            } else {
              console.log("Yp");

              toast({
                variant: "destructive",
                title: "Your request failed.",
                description: "User not found. Please try again.",
              });
            }
          });
        }}
        className="rounded-md mb-4 flex items-center"
      >
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
