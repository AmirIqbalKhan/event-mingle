'use client';

import React, { useState } from 'react';
import UserProfile from '@/components/Profile/UserProfile';

interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    eventReminders: boolean;
    newMessages: boolean;
  };
  privacy: {
    showProfile: boolean;
    showEvents: boolean;
    showContacts: boolean;
  };
  interests: string[];
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePreferences = async (preferences: UserPreferences) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save preferences
      console.log('Saving preferences:', preferences);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        <UserProfile onSave={handleSavePreferences} />
      </div>
    </div>
  );
} 