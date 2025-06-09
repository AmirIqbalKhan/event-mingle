"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const mockEvents = [
  { id: 1, name: 'Sunset Rooftop Party', location: 'Downtown', distance: '0.5 mi' },
  { id: 2, name: 'Yoga in the Park', location: 'Central Park', distance: '1.2 mi' },
];

export default function LocationPage() {
  const [enabled, setEnabled] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Location Services</h1>
      <div className="w-full max-w-md mb-6">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-4">
          <span>Map Placeholder</span>
        </div>
        <Button className="w-full mb-4" onClick={() => setEnabled(true)} disabled={enabled}>
          {enabled ? 'Location Enabled' : 'Enable Location'}
        </Button>
        <h2 className="font-bold mb-2">Nearby Events</h2>
        <div className="space-y-2">
          {mockEvents.map(ev => (
            <Card key={ev.id} className="p-2">
              <CardContent>
                <div className="font-semibold">{ev.name}</div>
                <div className="text-xs text-gray-500">{ev.location} · {ev.distance} away</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 