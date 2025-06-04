import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: {
      address: string;
      latitude: number;
      longitude: number;
    };
    images: string[];
    category: string;
    price: number;
    capacity: number;
    currentAttendees: number;
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSwipe }) => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-64"
      >
        {event.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${event.title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-2">{event.description}</p>
        
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location.address}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {event.category}
          </span>
          <span className="text-gray-600">
            ${event.price}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {event.currentAttendees}/{event.capacity} attendees
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onSwipe('left')}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={() => onSwipe('right')}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 