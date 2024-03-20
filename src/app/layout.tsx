import '@/app/globals.css'
import Providers from '@/components/Providers'
import ModalProvider from '@/components/providers/ModalProvider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import { Open_Sans } from "next/font/google"

export const metadata = {
  title: 'Discord',
  description: 'A Discord clone built with Next.js and TypeScript.',
}

const font = Open_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(
      'bg-white dark:bg-[#313338]', 
      font.className)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey='discord-theme'
          >
            <Providers>
              <ModalProvider />
              <div className=''>
                {children}
              </div>
              <Toaster />
            </Providers>
          </ThemeProvider>
      </body>
    </html>
  )
}
