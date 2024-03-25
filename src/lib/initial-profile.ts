import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";
import { db } from "@/lib/db"

export const initialProfile = async() => {
    const session = await getAuthSession()
    const user = session?.user

    if(!user){
        redirect("/sign-in")
    }

    const profile = db.user.findUnique({
        where: {
            id: user.id
        }
    })

    if(profile){
        return profile
    }

    const newProfile = await db.user.create({
        data : {
            userId : user.id,
            name : user.name!,
            imageUrl : user.image!,
            email : user.email!
        }
    })

    return newProfile;
};

