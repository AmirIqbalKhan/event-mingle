import { User } from './user';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  tags: string[];
  organizerId: string;
  organizer: User;
  attendees: User[];
  maxAttendees: number;
  price: number;
  isOnline: boolean;
  meetingLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 