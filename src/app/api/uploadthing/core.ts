import { getAuthSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = async ()=>{
    const session = await getAuthSession()
    const user = session?.user

    if (!user) throw new Error("Unauthorized");
    return {userId: user.id}
}

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 }})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
  .middleware(()=> handleAuth())
  .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;