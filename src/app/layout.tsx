import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/app/globals.css'
import { Inter } from "next/font/google"

export const metadata = {
  title: 'Discord',
  description: 'A Discord clone built with Next.js and TypeScript.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html 
    lang='en' 
    className={cn(
      'bg-white text-slate-900 antialiased light', 
      inter.className)}>
      <body className='min-h-screen  bg-slate-50 antialiased'>
          <Providers>

            <div className=''>
              {children}
            </div>
            <Toaster />
          </Providers>
      </body>
    </html>
  )
}
