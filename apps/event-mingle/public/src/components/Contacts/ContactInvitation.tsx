'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'pending' | 'accepted' | 'rejected';
  mutualConnections: number;
}

interface ContactInvitationProps {
  onSendInvitation: (email: string) => Promise<void>;
  onAcceptInvitation: (contactId: string) => Promise<void>;
  onRejectInvitation: (contactId: string) => Promise<void>;
}

export default function ContactInvitation({ onSendInvitation, onAcceptInvitation, onRejectInvitation }: ContactInvitationProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'pending'>('contacts');

  // Mock contacts data - replace with actual data fetching
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
      status: 'accepted',
      mutualConnections: 5
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
      status: 'accepted',
      mutualConnections: 3
    }
  ]);

  const [pendingInvitations, setPendingInvitations] = useState<Contact[]>([
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
      status: 'pending',
      mutualConnections: 2
    }
  ]);

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      await onSendInvitation(email);
      setEmail('');
    } catch (error) {
      console.error('Failed to send invitation:', error);
      setError('Failed to send invitation. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleAcceptInvitation = async (contactId: string) => {
    try {
      await onAcceptInvitation(contactId);
      const contact = pendingInvitations.find(c => c.id === contactId);
      if (contact) {
        setPendingInvitations(prev => prev.filter(c => c.id !== contactId));
        setContacts(prev => [...prev, { ...contact, status: 'accepted' }]);
      }
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      setError('Failed to accept invitation. Please try again.');
    }
  };

  const handleRejectInvitation = async (contactId: string) => {
    try {
      await onRejectInvitation(contactId);
      setPendingInvitations(prev => prev.filter(c => c.id !== contactId));
    } catch (error) {
      console.error('Failed to reject invitation:', error);
      setError('Failed to reject invitation. Please try again.');
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
            {pendingInvitations.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {pendingInvitations.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'contacts' ? (
          <>
            {/* Invite Form */}
            <form onSubmit={handleSendInvitation} className="mb-8">
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Invite'}
                </motion.button>
              </div>
            </form>

            {/* Contacts List */}
            <div className="space-y-4">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-500">
                        {contact.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 text-blue-600 hover:text-blue-700"
                  >
                    Message
                  </motion.button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {pendingInvitations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending invitations</p>
            ) : (
              pendingInvitations.map(contact => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-500">
                        {contact.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAcceptInvitation(contact.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRejectInvitation(contact.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </motion.button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 