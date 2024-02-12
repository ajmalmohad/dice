import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    name: string;
    role: string;
  }
  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    token: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}
