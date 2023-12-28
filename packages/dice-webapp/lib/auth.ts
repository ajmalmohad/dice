import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

function getPrismaAdapter(): Adapter {
  return PrismaAdapter(prisma) as Adapter;
}

let student = GoogleProvider({
  id: "student",
  name: "Student Account",
  async profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      emailVerified: profile.email_verified,
      image: profile.picture,
      role: profile.role ?? "STUDENT",
      pending: false,
    };
  },
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

let institution = GoogleProvider({
  id: "institution",
  name: "Institution Account",
  async profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      emailVerified: profile.email_verified,
      image: profile.picture,
      role: profile.role ?? "PENDING_INSTITUTION",
      pending: true,
    };
  },
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

export const authOptions = {
  adapter: getPrismaAdapter(),
  providers: [student, institution],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
} satisfies NextAuthOptions;

export const serverSession = async () => {
  return await getServerSession(authOptions);
};
