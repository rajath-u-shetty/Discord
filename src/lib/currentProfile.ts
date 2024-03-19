import { getAuthSession } from "./auth";
import { db } from "./db";

export const currentProfile = async() => {
    const session = await getAuthSession();
    const user = session?.user

    if(!user){
        return null
    }

    const profile = await db.user.findUnique({
        where: {
            id: user.id
        }
    })

    return profile;
}
 