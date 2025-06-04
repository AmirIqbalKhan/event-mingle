import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { UserNav } from '@/components/user-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Manager Dashboard',
  description: 'Comprehensive event management solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen h-full bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen h-full">
            <div className="p-4">
              <h1 className="text-xl font-bold">Event Manager</h1>
            </div>
            <Navigation />
            <div className="flex-1" /> {/* Pushes navigation to the top */}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-screen h-full">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                </div>
                <UserNav />
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
} 