'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { prisma } from '@/lib/db';
import { toast } from 'react-hot-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  price: number;
  status: string;
}

export default function DiscoverPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrefs, setShowPrefs] = useState(false);
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
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSwipe = async (direction: 'left' | 'right') => {
    try {
      const event = events[currentIndex];
      const response = await fetch(`/api/events/${event.id}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: direction === 'right' ? 'accept' : 'decline' }),
      });

      if (!response.ok) {
        throw new Error('Failed to respond to event');
      }

      setCurrentIndex((prev) => (prev + 1) % events.length);
      toast.success(direction === 'right' ? 'Event accepted!' : 'Event declined');
    } catch (err) {
      toast.error('Failed to respond to event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Events Found</h2>
          <p className="text-gray-600">There are no events available at the moment.</p>
        </div>
      </div>
    );
  }

  const event = events[currentIndex];

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Preferences Panel */}
      <Sheet open={showPrefs} onOpenChange={setShowPrefs}>
        <SheetTrigger asChild>
          <Button variant="outline" className="m-4 md:hidden">Preferences</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <h2 className="font-bold text-lg mb-4">Discovery Preferences</h2>
          <div className="space-y-2">
            <Button size="sm" variant="secondary">Music</Button>
            <Button size="sm" variant="secondary">Tech</Button>
            <Button size="sm" variant="secondary">Outdoor</Button>
            <Button size="sm" variant="secondary">Food</Button>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden md:block w-72 bg-white dark:bg-gray-900 border-r p-6">
        <h2 className="font-bold text-lg mb-4">Discovery Preferences</h2>
        <div className="space-y-2">
          <Button size="sm" variant="secondary">Music</Button>
          <Button size="sm" variant="secondary">Tech</Button>
          <Button size="sm" variant="secondary">Outdoor</Button>
          <Button size="sm" variant="secondary">Food</Button>
        </div>
      </aside>
      {/* Swipe UI */}
      <section className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Event Image</span>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-1">{event.title}</h2>
                  <p className="text-gray-600 mb-1">
                    {new Date(event.startDate).toLocaleDateString()} · {event.location}
                  </p>
                  <p className="text-gray-700 mb-2">{event.description}</p>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      Capacity: {event.capacity}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      ${event.price}
                    </span>
                  </div>
                  <div className="flex gap-4 justify-center mt-4">
                    <Button variant="destructive" className="rounded-full px-6" onClick={() => handleSwipe('left')}>
                      Decline
                    </Button>
                    <Button variant="default" className="rounded-full px-6" onClick={() => handleSwipe('right')}>
                      Accept
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
} 