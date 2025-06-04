'use client';

import { useState } from 'react';
import CalendarIntegration from '@/components/Events/CalendarIntegration';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  reminder: {
    type: 'email' | 'push' | 'both';
    time: number;
  };
}

// Temporary mock data
const mockEvent: CalendarEvent = {
  id: '1',
  title: 'Tech Meetup 2024',
  description: 'Join us for an evening of networking and tech talks',
  startDate: '2024-03-15T18:00:00Z',
  endDate: '2024-03-15T21:00:00Z',
  location: 'San Francisco, CA',
  reminder: {
    type: 'email',
    time: 30
  }
};

export default function EventCalendarPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<CalendarEvent>(mockEvent);

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvent(updatedEvent);
    // TODO: Implement event update logic
    console.log('Updating event:', updatedEvent);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Calendar Settings - Event ID: {params.id}
        </h1>

        <CalendarIntegration
          event={event}
          onUpdate={handleEventUpdate}
        />
      </div>
    </div>
  );
} 