'use client'

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { Switch } from "@nextui-org/switch"

export function SignInWithGoogleButton() {
  const [institution, setInstitution] = useState(false)

  return (
    <>
      <Switch checked={institution} onChange={() => setInstitution(!institution)} />
      <Button onClick={() => {
        institution ? signIn('institution') : signIn('student')
      }}
      size="lg"
      className="dark:bg-white dark:text-black bg-black text-white rounded-md"
      >
        <p className="text-sm md:text-base font-bold">Login with Google</p>
        <FaGoogle className="text-sm md:text-base" />
      </Button>
    </>
  )
}

export function SignOutButton() {
  return (
    <Button onClick={() => {
      signOut()
    }}>Sign Out</Button>
  )
}