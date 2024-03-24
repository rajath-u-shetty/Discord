import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if(!profile){
            return new NextResponse("Unauthorized", {  status: 401})
        }

        if(!serverId){
            return new NextResponse("Unauthorized", {  status: 401})
        }

        if(name === 'general'){
            return new NextResponse("Name cannt be 'general", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some:{
                        userId: profile.id,
                        role:{
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels: {
                    create: {
                        userId: profile.id,
                        name,
                        type,
                    }
                }
            }
        })
    } catch (error) {
        console.log("[CHANNELS_POST",error);
        return new NextResponse("Internal error", { status: 500 })
        
    }
}