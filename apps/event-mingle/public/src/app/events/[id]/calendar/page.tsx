'use client';

import React, { useState } from 'react';
import CalendarIntegration from '@/components/Events/CalendarIntegration';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  reminder?: {
    type: 'email' | 'push' | 'both';
    time: number;
  };
}

export default function EventCalendarPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  // Mock event data - replace with actual data fetching
  const event: CalendarEvent = {
    id: params.id,
    title: 'Tech Meetup 2024',
    description: 'Join us for an exciting tech meetup with industry experts.',
    startDate: new Date('2024-03-15T18:00:00'),
    endDate: new Date('2024-03-15T21:00:00'),
    location: '123 Tech Street, Silicon Valley, CA'
  };

  const handleSync = async (calendarType: 'google' | 'apple', event: CalendarEvent) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual calendar sync
      console.log('Syncing with', calendarType, 'calendar:', event);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to sync with calendar:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Calendar Settings - {event.title}
        </h1>
        <CalendarIntegration event={event} onSync={handleSync} />
      </div>
    </div>
  );
} 