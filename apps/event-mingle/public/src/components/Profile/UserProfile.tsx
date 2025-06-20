'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  profilePicture?: string;
}

interface UserProfileProps {
  onSave: (preferences: UserPreferences) => Promise<void>;
}

export default function UserProfile({ onSave }: UserProfileProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: {
      email: true,
      push: true,
      eventReminders: true,
      newMessages: true
    },
    privacy: {
      showProfile: true,
      showEvents: true,
      showContacts: true
    },
    interests: ['Technology', 'Music', 'Sports'],
    profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(preferences);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    try {
      // TODO: Implement actual file upload to server
      // For now, we'll use a mock URL
      const mockImageUrl = URL.createObjectURL(file);
      setPreferences(prev => ({
        ...prev,
        profilePicture: mockImageUrl
      }));
      setUploadError(null);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setUploadError('Failed to upload image. Please try again.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleNotification = (key: keyof UserPreferences['notifications']) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const togglePrivacy = (key: keyof UserPreferences['privacy']) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
          </motion.button>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 group">
              <Image
                src={preferences.profilePicture || 'https://ui-avatars.com/api/?name=John+Doe&background=random'}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="text-white text-sm">Change Photo</span>
                </motion.div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-500">john.doe@example.com</p>
              {uploadError && (
                <p className="text-red-500 text-sm mt-1">{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={() => toggleNotification('email')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={() => toggleNotification('push')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Push Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.notifications.eventReminders}
                onChange={() => toggleNotification('eventReminders')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Event Reminders</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.notifications.newMessages}
                onChange={() => toggleNotification('newMessages')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">New Messages</span>
            </label>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.privacy.showProfile}
                onChange={() => togglePrivacy('showProfile')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Show Profile to Others</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.privacy.showEvents}
                onChange={() => togglePrivacy('showEvents')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Show Events to Others</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.privacy.showContacts}
                onChange={() => togglePrivacy('showContacts')}
                disabled={!isEditing}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Show Contacts to Others</span>
            </label>
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'Music', 'Sports', 'Food', 'Art', 'Travel'].map(interest => (
              <motion.button
                key={interest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isEditing && toggleInterest(interest)}
                disabled={!isEditing}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  preferences.interests.includes(interest)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                } ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 