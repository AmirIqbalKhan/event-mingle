'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Event } from '@/types/event';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function EventCard({ event, onSwipe }: EventCardProps) {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
    setDragDirection(null);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={(_, info) => {
        const direction = info.offset.x > 0 ? 'right' : 'left';
        setDragDirection(direction);
      }}
      className="relative w-full h-[600px] bg-white rounded-xl shadow-lg overflow-hidden"
      style={{
        rotate: dragDirection ? (dragDirection === 'right' ? 15 : -15) : 0,
      }}
    >
      <div className="relative w-full h-[400px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{event.category}</span>
          <span className="text-sm font-medium text-gray-600">{event.price}</span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-4">{event.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex -space-x-2">
            {event.organizer.avatar && (
              <Image
                src={event.organizer.avatar}
                alt={event.organizer.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            )}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            Organized by {event.organizer.name}
          </span>
        </div>
      </div>

      {/* Swipe indicators */}
      {dragDirection && (
        <div
          className={`absolute top-4 ${
            dragDirection === 'right' ? 'right-4' : 'left-4'
          } p-2 rounded-full ${
            dragDirection === 'right' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {dragDirection === 'right' ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        </div>
      )}
    </motion.div>
  );
} 