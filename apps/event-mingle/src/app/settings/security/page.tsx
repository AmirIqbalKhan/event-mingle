'use client';

import { useRouter } from 'next/navigation';
import SecurityManager from '@/components/Security/SecurityManager';

export default function SecuritySettingsPage() {
  const router = useRouter();

  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    // TODO: Implement password change logic
    console.log('Changing password:', { oldPassword, newPassword });
  };

  const handleTwoFactorToggle = async (enabled: boolean) => {
    // TODO: Implement two-factor toggle logic
    console.log('Toggling two-factor:', enabled);
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
    console.log('Logging out');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Security Settings
        </h1>

        <SecurityManager
          onPasswordChange={handlePasswordChange}
          onTwoFactorToggle={handleTwoFactorToggle}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
} 