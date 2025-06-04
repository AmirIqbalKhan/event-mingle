'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationCenter from '@/components/Notifications/NotificationCenter';

interface Notification {
  id: string;
  type: 'event' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function Header() {
  const pathname = usePathname();

  const handleNotificationClick = (notification: Notification) => {
    // TODO: Implement notification click logic
    console.log('Notification clicked:', notification);
  };

  const handleMarkAllRead = () => {
    // TODO: Implement mark all as read logic
    console.log('Marking all notifications as read');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            EventMingle
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/discover"
              className={`text-sm font-medium ${
                isActive('/discover')
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Discover
            </Link>
            <Link
              href="/events/manage"
              className={`text-sm font-medium ${
                isActive('/events/manage')
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              My Events
            </Link>
            <Link
              href="/contacts"
              className={`text-sm font-medium ${
                isActive('/contacts')
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Contacts
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <NotificationCenter
              onNotificationClick={handleNotificationClick}
              onMarkAllRead={handleMarkAllRead}
            />
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 