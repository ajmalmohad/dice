'use client'

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { FaGoogle } from "react-icons/fa"

export function SignInWithGoogleButton() {
  return (
    <Button onClick={() => {
      signIn('google', {
        callbackUrl: 'http://localhost:3000',
      })
    }}
    size="lg"
    className="dark:bg-white dark:text-black bg-black text-white rounded-md"
    >
      <p className="font-bold">Login with Google</p>
      <FaGoogle />
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