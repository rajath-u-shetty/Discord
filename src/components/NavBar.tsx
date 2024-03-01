import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className=' '>
      <div className='body-blue fixed top-0 inset-x-0  body-blue  h-44 z-[10] py-2 text-white '>
        <div className='flex justify-evenly mt-5'>

        <Link href={"/"} className='dFont flex p-0 '>
          <Icons.logo2 className='h-2 w-2 ' />
          <p className='text-lg p-1 font-'>DISCORD</p>
        </Link>
        
        <div className='text-white font-bold flex  gap-10 '>
          <Link href={'/'} className='hover:underline'>Download</Link>
          <Link href={'/'} className='hover:underline'>Nitro</Link>
          <Link href={'/'} className='hover:underline'>Discover</Link>
          <Link href={'/'} className='hover:underline'>Safety</Link>
          <Link href={'/'} className='hover:underline'>Support</Link>
          <Link href={'/'} className='hover:underline'>Blog</Link>
          <Link href={'/'} className='hover:underline'>Careers</Link>
        </div>

        <Link href={'/sign-in'} className={cn(buttonVariants({
          variant: 'secondary'
        }), 'rounded-3xl font-bold')}>Login</Link >
      </div>

      </div>
    </div>
  )
}

export default NavBar
