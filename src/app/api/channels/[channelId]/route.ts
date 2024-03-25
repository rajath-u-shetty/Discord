import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}: {params: {channelId: string}}
    ) {
    try {
        const user = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");
        if(!user){
            return new NextResponse("unauthorized", { status : 401});
        }

        if(!serverId){
            return new NextResponse("server Id missing", { status: 400});
        }

        if(!params.channelId){
            return new NextResponse("channel Id missing", { status: 400})
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        userId: user.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log('[CHANNEL-ID-DELETE',error);
        return new NextResponse("Internal error", { status: 500 })
        
    }
}