'use client';

import { useState } from 'react';
import AttendeeList from '@/components/Events/AttendeeList';
import EventAnalytics from '@/components/Events/EventAnalytics';

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  registeredAt: Date;
  ticketType: string;
}

// Temporary mock data
const mockAttendees: Attendee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/images/avatars/john.jpg',
    status: 'confirmed',
    registeredAt: new Date('2024-02-15'),
    ticketType: 'VIP'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/images/avatars/jane.jpg',
    status: 'pending',
    registeredAt: new Date('2024-02-16'),
    ticketType: 'Regular'
  }
];

const mockAnalytics = {
  totalAttendees: 150,
  confirmedAttendees: 120,
  pendingAttendees: 20,
  cancelledAttendees: 10,
  ticketSales: {
    total: 5000,
    byType: {
      'VIP': 3000,
      'Regular': 2000
    }
  },
  registrationTrend: [
    { date: '2024-02-01', count: 10 },
    { date: '2024-02-02', count: 15 },
    { date: '2024-02-03', count: 20 }
  ],
  demographics: {
    ageGroups: {
      '18-24': 30,
      '25-34': 45,
      '35-44': 25,
      '45+': 10
    },
    gender: {
      'Male': 60,
      'Female': 40
    },
    location: {
      'New York': 40,
      'Los Angeles': 30,
      'Chicago': 20,
      'Miami': 10
    }
  }
};

export default function EventAnalyticsPage({ params }: { params: { id: string } }) {
  const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees);

  const handleStatusChange = (attendeeId: string, newStatus: Attendee['status']) => {
    setAttendees(attendees.map(attendee =>
      attendee.id === attendeeId
        ? { ...attendee, status: newStatus }
        : attendee
    ));
  };

  const handleRemoveAttendee = (attendeeId: string) => {
    setAttendees(attendees.filter(attendee => attendee.id !== attendeeId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Event Analytics - Event ID: {params.id}
        </h1>

        <div className="space-y-8">
          <EventAnalytics data={mockAnalytics} />
          <AttendeeList
            attendees={attendees}
            onStatusChange={handleStatusChange}
            onRemoveAttendee={handleRemoveAttendee}
          />
        </div>
      </div>
    </div>
  );
} 