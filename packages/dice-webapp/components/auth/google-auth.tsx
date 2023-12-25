'use client'

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { FaGoogle } from "react-icons/fa"

export function SignInWithGoogleButton() {
  return (
    <Button onClick={() => {
      signIn('google')
    }}
    size="lg"
    className="dark:bg-white dark:text-black bg-black text-white rounded-md"
    >
      <p className="text-sm md:text-base font-bold">Login with Google</p>
      <FaGoogle className="text-sm md:text-base" />
    </Button>
  )
}

export function SignOutButton() {
  return (
    <Button onClick={() => {
      signOut()
    }}>Sign Out</Button>
  )
}