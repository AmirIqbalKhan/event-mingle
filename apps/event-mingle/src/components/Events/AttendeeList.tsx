'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  registeredAt: Date;
  ticketType: string;
}

interface AttendeeListProps {
  attendees: Attendee[];
  onStatusChange: (attendeeId: string, newStatus: Attendee['status']) => void;
  onRemoveAttendee: (attendeeId: string) => void;
}

export default function AttendeeList({ attendees, onStatusChange, onRemoveAttendee }: AttendeeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Attendee['status'] | 'all'>('all');

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Attendee['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendees</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Attendee['status'] | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Attendees List */}
        <div className="space-y-4">
          {filteredAttendees.map((attendee) => (
            <motion.div
              key={attendee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={attendee.avatar}
                    alt={attendee.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{attendee.name}</h3>
                  <p className="text-sm text-gray-500">{attendee.email}</p>
                  <p className="text-xs text-gray-400">
                    Registered: {attendee.registeredAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={attendee.status}
                  onChange={(e) => onStatusChange(attendee.id, e.target.value as Attendee['status'])}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(attendee.status)}`}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => onRemoveAttendee(attendee.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}

          {filteredAttendees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No attendees found
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 