import { NextResponse } from 'next/server';
import { Event } from '@/types/event';

// Temporary mock data - will be replaced with database queries
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Meetup 2024',
    description: 'Join us for an evening of networking and tech talks',
    date: 'March 15, 2024',
    location: 'San Francisco, CA',
    image: '/images/tech-meetup.jpg',
    category: 'Technology',
    price: 'Free',
    organizer: {
      id: '1',
      name: 'Tech Community SF',
      avatar: '/images/organizer1.jpg'
    },
    attendees: 45,
    maxAttendees: 100,
    tags: ['technology', 'networking', 'startups'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Annual music festival featuring top artists',
    date: 'April 20, 2024',
    location: 'Los Angeles, CA',
    image: '/images/music-fest.jpg',
    category: 'Music',
    price: '$50',
    organizer: {
      id: '2',
      name: 'LA Music Events',
      avatar: '/images/organizer2.jpg'
    },
    attendees: 1200,
    maxAttendees: 2000,
    tags: ['music', 'festival', 'live'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

export async function GET() {
  // TODO: Implement actual database query
  // TODO: Add pagination
  // TODO: Add filtering based on user preferences
  
  return NextResponse.json(mockEvents);
} 