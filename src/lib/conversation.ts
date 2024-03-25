import { db } from "./db";

export const getOrCraeteConversation = async (memberOneId: string, memberTwoId: string)=> {
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

    if(!conversation){
        conversation = await createNewConversation(memberOneId, memberTwoId);
    }

    return conversation;
}

const findConversation = async(memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where:{
                AND:[
                    {memberOneId: memberOneId},
                    {memberTwoId: memberTwoId}
                ]
            },
            include: {
                memberOne: {
                    include: {
                        user: true,
                    }
                },
                memberTwo: {
                    include: {
                        user: true,
                    }
                }
            },
        })
    } catch (error) {
        console.log("conversation-error", error);
        return null;
    }
}

const createNewConversation = async(memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        user: true,
                    }
                },
                memberTwo: {
                    include: {
                        user: true,
                    }
                }
            }
        })
    } catch (error) {
        return null;
    }
}