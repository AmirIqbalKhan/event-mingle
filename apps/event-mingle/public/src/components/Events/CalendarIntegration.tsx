'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  reminder?: {
    type: 'email' | 'push' | 'both';
    time: number; // minutes before event
  };
}

interface CalendarIntegrationProps {
  event: CalendarEvent;
  onSync: (calendarType: 'google' | 'apple', event: CalendarEvent) => Promise<void>;
}

export default function CalendarIntegration({ event, onSync }: CalendarIntegrationProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [reminderType, setReminderType] = useState<'email' | 'push' | 'both'>('both');
  const [reminderTime, setReminderTime] = useState(30); // 30 minutes default

  const handleSync = async (calendarType: 'google' | 'apple') => {
    setIsSyncing(true);
    setSyncError(null);

    try {
      const eventWithReminder = {
        ...event,
        reminder: {
          type: reminderType,
          time: reminderTime
        }
      };

      await onSync(calendarType, eventWithReminder);
    } catch (error) {
      console.error('Failed to sync with calendar:', error);
      setSyncError('Failed to sync with calendar. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const generateICSFile = () => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EventMingle//Calendar Integration//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(event.startDate)}`,
      `DTEND:${formatDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar Integration</h2>

        {/* Sync Buttons */}
        <div className="flex space-x-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSync('google')}
            disabled={isSyncing}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync with Google Calendar'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSync('apple')}
            disabled={isSyncing}
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync with Apple Calendar'}
          </motion.button>
        </div>

        {/* Download ICS */}
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateICSFile}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download ICS File
          </motion.button>
        </div>

        {/* Reminder Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Reminder Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Type
            </label>
            <select
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value as 'email' | 'push' | 'both')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="push">Push Notification</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Time
            </label>
            <select
              value={reminderTime}
              onChange={(e) => setReminderTime(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
              <option value={120}>2 hours before</option>
              <option value={1440}>1 day before</option>
            </select>
          </div>
        </div>

        {syncError && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {syncError}
          </div>
        )}
      </div>
    </div>
  );
} 