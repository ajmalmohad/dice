"use client";

import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

export function SignInWithCreds() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let session = useSession();

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
          const signInData = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (signInData?.error) {
            console.log(signInData);
          }

          console.log(session?.data?.user);
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
