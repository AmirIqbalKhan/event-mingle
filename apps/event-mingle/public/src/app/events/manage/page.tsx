'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function EventManagementPage() {
  // Mock events data - replace with actual data fetching
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Meetup 2024',
      date: '2024-03-15',
      location: 'Silicon Valley',
      attendees: 120,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Design Workshop',
      date: '2024-03-20',
      location: 'Design Hub',
      attendees: 45,
      status: 'upcoming'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
        <Link
          href="/events/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
              <div className="space-y-2 text-gray-600">
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>Attendees: {event.attendees}</p>
                <p>Status: {event.status}</p>
              </div>
              <div className="mt-6 flex space-x-3">
                <Link
                  href={`/events/${event.id}/edit`}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <Link
                  href={`/events/${event.id}/analytics`}
                  className="flex-1 px-3 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
                >
                  Analytics
                </Link>
                <Link
                  href={`/events/${event.id}/calendar`}
                  className="flex-1 px-3 py-2 bg-purple-600 text-white text-center rounded hover:bg-purple-700"
                >
                  Calendar
                </Link>
                <Link
                  href={`/events/${event.id}/expenses`}
                  className="flex-1 px-3 py-2 bg-yellow-600 text-white text-center rounded hover:bg-yellow-700"
                >
                  Expenses
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 