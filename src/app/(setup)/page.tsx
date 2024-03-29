import InitialModel from '@/components/modals/InitialModel';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const SetupPage = async (props: Props) => {

  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: profile?.id
        }
      }
    }
  });

  if(server) return redirect(`/servers/${server.id}`)

  return <InitialModel />;
}

export default SetupPage

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