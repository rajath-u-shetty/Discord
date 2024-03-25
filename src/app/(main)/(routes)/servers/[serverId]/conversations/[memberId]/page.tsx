import ChatHeader from "@/components/chat/ChatHeader";
import { getOrCraeteConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string,
    serverId: string,
  }
}

const MemberIdPage = async({
  params
}: MemberIdPageProps) => {
  const user = await currentProfile();

  if(!user){
    return redirect("/sign-in")
  }

  const curentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id,
    },
    include: {
      user: true,
    }
  })

  if(!curentMember){
    return redirect("/");
  }

  const conversation = await getOrCraeteConversation(curentMember.id, params.memberId)
  if(!conversation){
    return redirect(`/servers/${params.serverId}`)
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.user.imageUrl}
        name={otherMember.user.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  )
}

export default MemberIdPage
