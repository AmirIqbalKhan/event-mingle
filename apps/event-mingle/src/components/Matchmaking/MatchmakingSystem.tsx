'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  location: string;
  category: string;
  matchScore: number;
  attendees: number;
  maxAttendees: number;
}

interface MatchmakingSystemProps {
  onEventSelect: (eventId: string) => void;
}

export default function MatchmakingSystem({ onEventSelect }: MatchmakingSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'date'>('match');

  // Mock data
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Meetup 2024',
      description: 'Join us for an evening of networking and tech talks',
      image: '/images/events/tech-meetup.jpg',
      date: new Date('2024-03-15'),
      location: 'San Francisco, CA',
      category: 'Technology',
      matchScore: 95,
      attendees: 45,
      maxAttendees: 100
    },
    {
      id: '2',
      title: 'Music Festival',
      description: 'A weekend of amazing music and fun activities',
      image: '/images/events/music-festival.jpg',
      date: new Date('2024-04-20'),
      location: 'Los Angeles, CA',
      category: 'Music',
      matchScore: 85,
      attendees: 120,
      maxAttendees: 200
    }
  ];

  const categories = ['all', 'Technology', 'Music', 'Sports', 'Food', 'Art'];

  const filteredEvents = events
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'match') {
        return b.matchScore - a.matchScore;
      }
      return a.date.getTime() - b.date.getTime();
    });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Events</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'match' | 'date')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="match">Sort by Match Score</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map(event => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-lg"
            >
              <div className="relative w-full md:w-48 h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-gray-500">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {event.matchScore}% Match
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.attendees}/{event.maxAttendees} attendees
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-gray-600">{event.description}</p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEventSelect(event.id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 