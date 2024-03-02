import InitialModel from "@/components/modals/InitialModel";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";

const page = async() => {
  const user = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id
        }
      }
    }
  });

  if(server){
    redirect(`/server/${server.id}`);
  }

  return (
    <InitialModel />
  )
}

export default page


{/* <div>
      Home page
      <Link href={"/sign-in"} className={buttonVariants()}>sign in</Link>

      {session?.user? (
            <UserAccountNav user={session.user} />
        ) : <Link href="/sign-in" className={buttonVariants()}>
                Sign In
            </Link>}
      <ModeToggle />
    </div> */}