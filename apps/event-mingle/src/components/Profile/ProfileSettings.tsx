'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileSettingsProps {
  onSave: (settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
    language: string;
  }) => void;
}

export default function ProfileSettings({ onSave }: ProfileSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'en'
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-700">Email Notifications</label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-700">Push Notifications</label>
              <p className="text-sm text-gray-500">Receive push notifications</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('pushNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-700">Dark Mode</label>
              <p className="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Language</h3>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Select Language
            </label>
            <select
              id="language"
              value={settings.language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </motion.div>
  );
} 