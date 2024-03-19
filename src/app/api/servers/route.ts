import { currentProfile } from "@/lib/currentProfile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { MemberRoles } from "@prisma/client";
import { serverSchema } from "@/lib/validators/serverValidator";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request){
    try {
        const session = await getAuthSession();
        if(!session?.user) return new Response("Unauthorized", { status: 401}) 

        const body = await req.json();
        const { image, name} = serverSchema.parse(body)

        const user = await currentProfile();

        if(!user){
            return new NextResponse("unauthorized", { status: 401 })
        }

        const server = await db.server.create({
            data: {
                userId: user.id,
                name,
                imageUrl: image,
                inviteCode: uuidv4(),
                channels:{
                    create: [
                        {name: 'general', userId: user.id}
                    ]
                },
                members: {
                    create: [
                        { userId: user.id, role: MemberRoles.ADMIN}
                    ]
                }
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVERS_POST]', error);
        return new NextResponse("Internal Error", { status: 500})
    }
}
