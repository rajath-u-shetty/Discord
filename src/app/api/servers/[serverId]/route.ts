import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { serverSchema } from "@/lib/validators/serverValidator";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string}}) {
    try {
        const profile = await currentProfile();

        const body = await req.json();
        const {name, image} = serverSchema.parse(body)

        if(!profile){
            return new NextResponse("UNAUTHORIZED", { status: 401 })
        }

        const server = await db.server.update({
            where:{
                id: params.serverId,
                userId: profile.id,
            },
            data:{
                name,
                imageUrl: image,
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_IDD_PATCH", error);
        return new NextResponse("Internal error", { status: 500 })
        
    }
}