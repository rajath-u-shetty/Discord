import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, { params}: {params: { serverId: string }}) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("unauthorized", { status: 401 })
        }

        if(!params.serverId){
            return new NextResponse("no server id", { status: 401 })
        }
        const server = await db.server.update({
            where: {
                id: params.serverId,
                userId: {
                    not: profile.id
                },
                members: {
                    some: {
                        userId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        serverId: profile.id
                    }
                }
            },
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_ID_LEAVE", error);
        return new NextResponse("internal error", { status: 500 })
        
    }
}