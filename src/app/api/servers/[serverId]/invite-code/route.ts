import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4} from "uuid"

export async function PATCH(req: Request, { params }: { params: { serverId: string }}){
    try {
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("UNAUTHORIZED", { status: 500});
        }

        if(!params.serverId){
            return new NextResponse("ServerId Missing", { status: 400 })
        }

        const server = await db.server.update({
            where:{
                id: params.serverId,
                userId: profile.id,
            },
            data:{
                 inviteCode: uuidv4(),
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID]",error);
        return new NextResponse("INTERNAL ERROR", { status : 500 })
    }
}