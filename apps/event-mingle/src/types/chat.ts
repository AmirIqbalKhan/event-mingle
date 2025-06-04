import { Event } from './event';
import { User } from './user';

export interface Chat {
  id: string;
  eventId: string;
  event: Event;
  participants: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  chatId: string;
  senderId: string;
  sender: User;
  read: boolean;
  createdAt: string;
  updatedAt: string;
} 