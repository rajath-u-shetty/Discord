import { Session, User } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: string,
        }
    }
}

declare module 'next-auth' {
    interface User {
        id: string
    }
}