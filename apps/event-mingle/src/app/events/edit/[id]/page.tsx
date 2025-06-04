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

// Temporary mock data
const mockEvents: Record<string, EventFormData> = {
  '1': {
    title: 'Tech Meetup 2024',
    description: 'Join us for an evening of networking and tech talks',
    date: '2024-03-15',
    time: '18:00',
    location: 'San Francisco, CA',
    category: 'Technology',
    price: 'Free',
    image: null,
    maxAttendees: 100
  }
};

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const eventData = mockEvents[params.id];

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <p className="text-gray-600">The event you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: EventFormData) => {
    // TODO: Implement event update logic
    console.log('Updating event:', data);
    router.push('/events/manage');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <EventForm
          onSubmit={handleSubmit}
          initialData={eventData}
          isEditing={true}
        />
      </div>
    </div>
  );
} 