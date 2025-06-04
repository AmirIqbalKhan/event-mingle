'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '@/components/discover/EventCard';
import { Event } from '@/types/event';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Handle event acceptance
      console.log('Event accepted:', events[currentIndex]);
      // TODO: Send acceptance to backend
    }
    // Move to next event
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Discover Events</h1>
        
        <div className="relative h-[600px]">
          <AnimatePresence>
            {events.length > 0 && currentIndex < events.length && (
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute w-full"
              >
                <EventCard
                  event={events[currentIndex]}
                  onSwipe={handleSwipe}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentIndex >= events.length && (
          <div className="text-center mt-8">
            <p className="text-gray-600">No more events to show</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              onClick={() => setCurrentIndex(0)}
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 