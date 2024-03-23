import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}: {params: { memberId: string}}) {
    try {
        const profile = await currentProfile();
        const { searchParams} = new URL(req.url);
        const { role } = await req.json()

        const serverId = searchParams.get("serverId");

        if(!profile){
            return new NextResponse("unauthorized", { status: 401 })
        }

        if(!serverId){
            return new NextResponse("server Id missing", { status: 400 })
        }

        if(!params.memberId){
            return new NextResponse("member Id missing", { status: 400 })
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                userId: profile.id,
            },
            data:{
                members:{
                    update:{
                        where:{
                            id: params.memberId,
                            userId:{
                                not: profile.id
                            }
                        },
                        data:{
                            role
                        }
                    }
                }
            },
            include:{
                members:{
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500})
        
    }
}