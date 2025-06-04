'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    category: string;
    price: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function EventCard({ event, onSwipe }: EventCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) {
          onSwipe('right');
        } else if (info.offset.x < -100) {
          onSwipe('left');
        }
      }}
    >
      <div className="relative h-64 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/event-placeholder.jpg';
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-blue-600">{event.category}</span>
          <span className="text-sm font-semibold text-gray-600">{event.price}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date}
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      </div>
    </motion.div>
  );
} 