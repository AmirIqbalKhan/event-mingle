'use client';

import ProfileSettings from '@/components/Profile/ProfileSettings';

export default function SettingsPage() {
  const handleSaveSettings = (settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
    language: string;
  }) => {
    // TODO: Implement settings save logic
    console.log('Saving settings:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProfileSettings onSave={handleSaveSettings} />
      </div>
    </div>
  );
} 