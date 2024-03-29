"use client"

import { MemberRole } from "@prisma/client"
import { ServerWithMembersWithProfiles } from "../../../types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/Dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

type Props = {
    server : ServerWithMembersWithProfiles,
    role? : MemberRole
}

const ServerHeader = ({server,role}: Props) => {
  const {onOpen} = useModal()  
  const isAdmin = role === MemberRole.ADMIN  
  const isModerator = isAdmin || role === MemberRole.MODERATOR
  const isGuest = role === MemberRole.GUEST

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 dark:hover:bg-[rgb(81,101,242)] dark:hover:text-neutral-200 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer dark:hover:bg-[rgb(81,101,242)] dark:hover:text-neutral-200"
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="px-3 py-2 text-sm cursor-pointer dark:hover:bg-[rgb(81,101,242)] dark:hover:text-neutral-200"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-sm cursor-pointer dark:hover:bg-[rgb(81,101,242)] dark:hover:text-neutral-200"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator />
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer dark:hover:bg-red-500 dark:hover:text-neutral-200"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer dark:hover:bg-red-500 dark:hover:text-neutral-200"
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader