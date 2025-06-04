import './globals.css'
import type { Metadata } from 'next'
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

export const metadata: Metadata = {
  title: 'EventMingle Admin Dashboard',
  description: 'Admin dashboard for EventMingle platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-papm6Q+ua5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="bg-gray-50">
        <Sidebar />
        <TopNav />
        <main className="ml-64 pt-16 min-h-screen p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
