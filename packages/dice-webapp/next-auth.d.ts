import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultUser & { role: string }
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string
  }
}