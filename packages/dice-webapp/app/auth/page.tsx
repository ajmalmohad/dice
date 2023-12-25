"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <Button onClick={() => {
        signIn('google', {
          callbackUrl: 'http://localhost:3000',
        })
      }}>Sign In with Google</Button>
    </div>
  );
}