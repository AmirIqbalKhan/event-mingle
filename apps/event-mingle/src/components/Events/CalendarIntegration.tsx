'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  reminder: {
    type: 'email' | 'push' | 'both';
    time: number; // minutes before event
  };
}

interface CalendarIntegrationProps {
  event: CalendarEvent;
  onUpdate: (event: CalendarEvent) => void;
}

export default function CalendarIntegration({ event, onUpdate }: CalendarIntegrationProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleGoogleCalendarSync = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      // TODO: Implement Google Calendar API integration
      const icsData = generateICS(event);
      // For now, we'll just download the ICS file
      downloadICS(icsData, event.title);
    } catch {
      setSyncError('Failed to sync with Google Calendar. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAppleCalendarSync = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      // TODO: Implement Apple Calendar integration
      const icsData = generateICS(event);
      // For now, we'll just download the ICS file
      downloadICS(icsData, event.title);
    } catch {
      setSyncError('Failed to sync with Apple Calendar. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleReminderChange = (type: 'email' | 'push' | 'both', time: number) => {
    onUpdate({
      ...event,
      reminder: { type, time }
    });
  };

  const generateICS = (event: CalendarEvent) => {
    // Basic ICS file format
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventMingle//EN
BEGIN:VEVENT
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const downloadICS = (icsData: string, filename: string) => {
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar Integration</h2>

        {/* Sync Options */}
        <div className="space-y-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleCalendarSync}
            disabled={isSyncing}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync with Google Calendar'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAppleCalendarSync}
            disabled={isSyncing}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync with Apple Calendar'}
          </motion.button>

          {syncError && (
            <p className="text-red-600 text-sm">{syncError}</p>
          )}
        </div>

        {/* Reminder Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Reminder Settings</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reminder Type
            </label>
            <select
              value={event.reminder.type}
              onChange={(e) => handleReminderChange(e.target.value as 'email' | 'push' | 'both', event.reminder.time)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="push">Push Notification</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reminder Time
            </label>
            <select
              value={event.reminder.time}
              onChange={(e) => handleReminderChange(event.reminder.type, Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 