import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./NavigationAction";
import { Separator } from "../ui/Separator";
import { ScrollArea } from "../ui/Scroll-area";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "../mode-toggle";
import UserDropdown from "../UserDropdown";

const NavigationSidebar = async () => {
    const user = await currentProfile();

    if(!user){
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    })
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300  dark:zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavigationSidebar
