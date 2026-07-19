// auth.config.ts
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [], // populated in lib/auth.ts, not here — keep this Edge-safe
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = request.nextUrl.pathname.startsWith('/admin')
      if (isOnAdmin) return isLoggedIn && auth?.user?.role === 'ADMIN'
      return true
    },
  },
} satisfies NextAuthConfig