import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {serverId: string}
}) => {

    const profile = await currentProfile();

    if(!profile){
        redirect("/")
    }
    
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    userId: profile.id,
                }
            }
        }
    })

    if(!server){
        redirect("/")
    }

    return (
        <div className="h-full">
            <div className="fixed hidden md:flex h-full w-60 z-20 flex-col inset-y-0">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}
 
export default ServerIdLayout;