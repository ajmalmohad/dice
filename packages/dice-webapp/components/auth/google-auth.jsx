'use client'

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"

export function SignInWithGoogleButton() {
  return (
    <Button onClick={() => {
      signIn('google', {
        callbackUrl: 'http://localhost:3000',
      })
    }}>Sign In with Google</Button>
  )
}

export function SignOutButton() {
  return (
    <Button onClick={() => {
      signOut()
    }}>Sign Out</Button>
  )
}