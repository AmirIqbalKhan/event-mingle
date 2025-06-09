'use client';

import React, { useState } from 'react';
import ContactInvitation from '../../../../src/components/Contacts/ContactInvitation';

export default function ContactsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInvitation = async (email: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual invitation sending
      console.log('Sending invitation to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to send invitation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvitation = async (contactId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual invitation acceptance
      console.log('Accepting invitation from:', contactId);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectInvitation = async (contactId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual invitation rejection
      console.log('Rejecting invitation from:', contactId);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to reject invitation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contacts</h1>
        <ContactInvitation
          onInvite={handleSendInvitation}
          onAccept={handleAcceptInvitation}
          onReject={handleRejectInvitation}
        />
      </div>
    </div>
  );
} 