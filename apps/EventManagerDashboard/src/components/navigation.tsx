'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon
              className={cn(
                'mr-3 h-5 w-5',
                isActive ? 'text-white' : 'text-gray-400'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 