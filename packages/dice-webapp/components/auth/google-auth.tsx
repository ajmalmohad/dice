"use client";

import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { Switch } from "../ui/switch";

export function SignInWithGoogleButton() {
  const [institution, setInstitution] = useState(false);

  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <p className="text-sm md:text-base font-medium mr-4">
          Login as Institution?
        </p>
        <Switch
          color="warning"
          checked={institution}
          onCheckedChange={() => setInstitution(!institution)}
        />
      </div>
      <Button
        onClick={() => {
          institution ? signIn("institution") : signIn("student");
        }}
        className="rounded-md mb-4 flex items-center"
      >
        <p className="text-sm md:text-base font-bold">Login with Google</p>
        <FaGoogle className="ml-2 text-sm md:text-base" />
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
