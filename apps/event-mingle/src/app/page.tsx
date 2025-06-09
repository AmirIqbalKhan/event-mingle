"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const trendingEvents = [
  { id: 1, name: 'Sunset Rooftop Party', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', date: 'Sat, 7pm', location: 'Downtown', tags: ['Music', 'Drinks'] },
  { id: 2, name: 'Tech Networking', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', date: 'Fri, 6pm', location: 'Tech Hub', tags: ['Networking', 'Tech'] },
  { id: 3, name: 'Art & Wine Night', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', date: 'Thu, 8pm', location: 'Gallery', tags: ['Art', 'Wine'] },
  { id: 4, name: 'Yoga in the Park', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92', date: 'Sun, 9am', location: 'Central Park', tags: ['Wellness', 'Outdoor'] },
  { id: 5, name: 'Startup Pitch', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', date: 'Wed, 5pm', location: 'Innovation Center', tags: ['Startup', 'Pitch'] },
  { id: 6, name: 'Foodie Fest', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', date: 'Sat, 12pm', location: 'Market', tags: ['Food', 'Festival'] },
];

const recommendations = trendingEvents.slice(3);
const swipeEvents = trendingEvents.slice(0, 3);

export default function HomePage() {
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center py-12 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Swipe. Match. Mingle at Events.
        </motion.h1>
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
          Discover, chat, and split costs with friends at the best events around you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="rounded-full shadow">
            <Link href="/discover">Discover Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full shadow">
            <Link href="/contacts">Invite Contacts</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full shadow">
            <Link href="/cost-splitting">Split Costs</Link>
          </Button>
        </div>
      </section>

      {/* Tinder-style Carousel */}
      <section className="max-w-xl mx-auto mb-10">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <img src={swipeEvents[swipeIndex].image} alt={swipeEvents[swipeIndex].name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">{swipeEvents[swipeIndex].name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{swipeEvents[swipeIndex].date} · {swipeEvents[swipeIndex].location}</p>
                <div className="flex gap-2 mb-4">
                  {swipeEvents[swipeIndex].tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <Button variant="destructive" className="rounded-full px-6">Decline</Button>
                  <Button variant="default" className="rounded-full px-6">Accept</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
            size="icon"
            variant="secondary"
            onClick={() => setSwipeIndex((i) => (i === 0 ? swipeEvents.length - 1 : i - 1))}
            aria-label="Previous"
          >
            &larr;
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
            size="icon"
            variant="secondary"
            onClick={() => setSwipeIndex((i) => (i === swipeEvents.length - 1 ? 0 : i + 1))}
            aria-label="Next"
          >
            &rarr;
          </Button>
        </motion.div>
      </section>

      {/* Trending/Nearby Events Grid */}
      <section className="max-w-6xl mx-auto mb-10 px-4">
        <h3 className="text-2xl font-bold mb-6">Trending Nearby</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.04 }}
              className="transition-transform"
            >
              <Card className="shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{event.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{event.date} · {event.location}</p>
                    <div className="flex gap-2 mt-2">
                      {event.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal Recommendations */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Recommended for You</h3>
          <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        {showFilters && (
          <div className="mb-4 p-4 bg-white rounded-xl shadow flex flex-wrap gap-2">
            {/* Example filter toggles */}
            <Button size="sm" variant="secondary">Music</Button>
            <Button size="sm" variant="secondary">Tech</Button>
            <Button size="sm" variant="secondary">Outdoor</Button>
            <Button size="sm" variant="secondary">Food</Button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.map((event) => (
            <Card key={event.id} className="shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{event.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{event.date} · {event.location}</p>
                  <div className="flex gap-2 mt-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
