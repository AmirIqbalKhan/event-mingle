'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  image: string;
  maxAttendees: number;
  currentAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface EventDiscoveryProps {
  events: Event[];
  onMatch: (eventId: string) => void;
  onSkip: (eventId: string) => void;
}

export default function EventDiscovery({ events, onMatch, onSkip }: EventDiscoveryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentEvent = events[currentIndex];

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handleMatch();
      } else {
        handleSkip();
      }
    }
  };

  const handleMatch = () => {
    setDirection(1);
    onMatch(currentEvent.id);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
      setDirection(0);
    }, 300);
  };

  const handleSkip = () => {
    setDirection(-1);
    onSkip(currentEvent.id);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
      setDirection(0);
    }, 300);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction > 0 ? 30 : -30,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction < 0 ? 30 : -30,
    }),
  };

  return (
    <div className="relative h-[600px] w-full max-w-md mx-auto">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            rotate: { type: "spring", stiffness: 300, damping: 30 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full bg-white rounded-xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <div className="relative h-2/3">
            <Image
              src={currentEvent.image}
              alt={currentEvent.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white mb-1">{currentEvent.title}</h2>
              <p className="text-white/90 text-sm">{currentEvent.category}</p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(currentEvent.date).toLocaleDateString()} at {currentEvent.time}
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {currentEvent.location}
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">{currentEvent.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {currentEvent.currentAttendees} / {currentEvent.maxAttendees} attendees
              </div>
              <div className="text-lg font-semibold text-blue-600">{currentEvent.price}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSkip}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMatch}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
} 