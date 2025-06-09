"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const mockMatches = [
  { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', interests: ['Music', 'Art'] },
  { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', interests: ['Tech', 'Food'] },
  { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', interests: ['Yoga', 'Outdoor'] },
];

export default function MatchmakingPage() {
  const [index, setIndex] = useState(0);
  const match = mockMatches[index];

  const handleSwipe = (dir: 'left' | 'right') => {
    setIndex(i => (i + 1) % mockMatches.length);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <h1 className="text-2xl font-bold mb-6">Find Your Event Match</h1>
      <div className="w-full max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={match.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl rounded-2xl overflow-hidden mb-4">
              <CardContent className="flex flex-col items-center p-6">
                <img src={match.avatar} alt={match.name} className="w-24 h-24 rounded-full mb-2" />
                <div className="text-xl font-bold mb-1">{match.name}</div>
                <div className="flex gap-2 mb-2 flex-wrap justify-center">
                  {match.interests.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <Button variant="destructive" className="rounded-full px-6" onClick={() => handleSwipe('left')}>Skip</Button>
                  <Button variant="default" className="rounded-full px-6" onClick={() => handleSwipe('right')}>Match</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 max-w-xs w-full bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <h2 className="font-bold mb-2">Your Matches</h2>
        <div className="text-gray-700 dark:text-gray-200 text-sm">Matched with <span className="font-semibold">2</span> people this week.</div>
      </div>
    </main>
  );
} 