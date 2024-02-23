import { NextAuthOptions, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { compare } from "bcrypt";

const adapter = PrismaAdapter(prisma) as Adapter;

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (user && (await compare(credentials.password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token?.role as string;
      session.user.id = token?.id as string;
      return session;
    },
  },
};

export const serverSession = async () => {
  return await getServerSession(authOptions);
};
