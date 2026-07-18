import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import bcrypt from "bcryptjs"
import { Role } from ".prisma/client/default.js"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  ...authConfig,

  providers: [
    ...authConfig.providers,

    // override authorize here
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
      }

      return session
    },
  },
})