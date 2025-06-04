'use client';

import { useRouter } from 'next/navigation';
import EventForm from '@/components/Events/EventForm';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  image: File | null;
  maxAttendees: number;
}

export default function CreateEventPage() {
  const router = useRouter();

  const handleSubmit = async (data: EventFormData) => {
    // TODO: Implement event creation logic
    console.log('Creating event:', data);
    router.push('/events/manage');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <EventForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 