'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'pending' | 'accepted' | 'rejected';
  mutualConnections: number;
}

interface ContactInvitationProps {
  onInvite: (email: string) => void;
  onAccept: (contactId: string) => void;
  onReject: (contactId: string) => void;
}

export default function ContactInvitation({ onInvite, onAccept, onReject }: ContactInvitationProps) {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'pending'>('contacts');

  // Mock data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/images/avatars/john.jpg',
      status: 'accepted',
      mutualConnections: 5
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/images/avatars/jane.jpg',
      status: 'pending',
      mutualConnections: 3
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contacts</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'contacts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            My Contacts
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending Invitations
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Invite Form */}
        <form onSubmit={handleInvite} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter email to invite"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Invite
            </motion.button>
          </div>
        </form>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-xs text-gray-400">
                    {contact.mutualConnections} mutual connections
                  </p>
                </div>
              </div>

              {contact.status === 'pending' ? (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAccept(contact.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onReject(contact.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </motion.button>
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 