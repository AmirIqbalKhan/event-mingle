import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserNav } from './user-nav';
import {
  Calendar,
  Users,
  Building2,
  Boxes,
  BarChart3,
  Settings,
  User,
  Ticket,
  CreditCard,
  CheckSquare,
  Workflow,
  Users2,
  Wallet,
  Link2,
  MessageSquare,
  FileText,
  Database,
  Home,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Venues', href: '/venues', icon: Building2 },
  { name: 'Staff', href: '/staff', icon: Users },
  { name: 'Resources', href: '/resources', icon: Boxes },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Clients', href: '/clients', icon: Users2 },
  { name: 'Client Reports', href: '/client-reports', icon: FileText },
  { name: 'Communications', href: '/communications', icon: MessageSquare },
  { name: 'Finance', href: '/finance', icon: Wallet },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Integrations', href: '/integrations', icon: Link2 },
  { name: 'Data Management', href: '/data-management', icon: Database },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-indigo-600">Event Manager</h1>
              </div>
              <div className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      pathname === item.href
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 flex-shrink-0 h-6 w-6',
                        pathname === item.href
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex justify-end">
              <UserNav />
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 