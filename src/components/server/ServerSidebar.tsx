import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { ChanneType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./ServerHeader";

interface ServerSidebarProps {
    serverId: string
}

const ServerSidebar = async({serverId}: ServerSidebarProps) => {

    const user = await currentProfile();
    if(!user){
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    user: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        },
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChanneType.TEXT )
    const audioChannels = server?.channels.filter((channel) => channel.type === ChanneType.AUDIO )
    const videoChannels = server?.channels.filter((channel) => channel.type === ChanneType.VIDEO )
    const members = server?.members.filter((member) => member.userId !== user.id )

    if(!server){
        redirect("/")
    }

    const role = server.members.find((member) => member.userId === user.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar
