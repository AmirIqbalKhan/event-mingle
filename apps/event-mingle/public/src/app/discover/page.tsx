'use client';

import React, { useState, useEffect } from 'react';
import { EventCard } from '@/features/event-discovery/components/EventCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  images: string[];
  category: string;
  price: number;
  capacity: number;
  currentAttendees: number;
}

export default function DiscoverPage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);

  const { data: recommendedEvents, isLoading } = useQuery<Event[]>(
    'recommendedEvents',
    async () => {
      const response = await axios.get('/api/events/recommended');
      return response.data;
    }
  );

  useEffect(() => {
    if (recommendedEvents) {
      setEvents(recommendedEvents);
    }
  }, [recommendedEvents]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!events[currentEventIndex]) return;

    try {
      await axios.post('/api/events/swipe', {
        eventId: events[currentEventIndex].id,
        direction,
      });

      if (direction === 'right') {
        toast.success('Event added to your interests!');
      }

      setCurrentEventIndex((prev) => prev + 1);
    } catch (error) {
      toast.error('Failed to process swipe');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (currentEventIndex >= events.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">No more events to show</h2>
        <p className="text-gray-600 mb-4">Check back later for more events!</p>
        <button
          onClick={() => setCurrentEventIndex(0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Discover Events</h1>
        <EventCard
          event={events[currentEventIndex]}
          onSwipe={handleSwipe}
        />
      </div>
    </div>
  );
} 