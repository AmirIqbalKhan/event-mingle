'use client';

import { useState } from 'react';
import ContactInvitation from '@/components/Contacts/ContactInvitation';

export default function ContactsPage() {
  const [invitations, setInvitations] = useState<string[]>([]);

  const handleInvite = (email: string) => {
    // TODO: Implement invitation logic
    console.log('Inviting:', email);
    setInvitations([...invitations, email]);
  };

  const handleAccept = (contactId: string) => {
    // TODO: Implement accept logic
    console.log('Accepting contact:', contactId);
  };

  const handleReject = (contactId: string) => {
    // TODO: Implement reject logic
    console.log('Rejecting contact:', contactId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Contacts & Invitations
        </h1>

        <ContactInvitation
          onInvite={handleInvite}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
    </div>
  );
} 