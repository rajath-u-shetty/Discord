import { NextAuthOptions, Session, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({session, user}: { session: Session, user: User}){
            if(session.user){
                session.user.id = user.id
            }
            return session
        },
        redirect(){
            return '/'
        }
    }

} 

export const getAuthSession = () => getServerSession(authOptions);
