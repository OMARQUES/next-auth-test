import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import authConfig from "./auth.config"

import {db} from "@/lib/db"
import { getUserByID } from "./data/user"

declare module "@auth/core" {
  interface Session{
    user:{
      role: "ADMIN" | "USER"
    }& DefaultSession["user"]
  }
}

const prisma = new PrismaClient()
 
export const { auth, handlers, signIn, signOut 

} = NextAuth({
  pages:{
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    async session({token, session}) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(token.role && session.user){
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({token}) {
      if(!token.sub) return token

      const existingUser = await getUserByID(token.sub)

      if(!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})