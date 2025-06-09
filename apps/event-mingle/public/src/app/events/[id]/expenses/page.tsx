'use client';

import React, { useState } from 'react';
import CostSplitting from '../../../../components/Events/CostSplitting';

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  balance: number;
}

export default function EventExpensesPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  // Mock attendees data - replace with actual data fetching
  const attendees: Attendee[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
      balance: 0
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
      balance: 0
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
      balance: 0
    }
  ];

  const handleAddExpense = async (expense: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual expense creation
      console.log('Adding expense:', expense);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettlePayment = async (payment: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual payment settlement
      console.log('Settling payment:', payment);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to settle payment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Event Expenses - ID: {params.id}
        </h1>
        <CostSplitting
          attendees={attendees}
          onAddExpense={handleAddExpense}
          onSettlePayment={handleSettlePayment}
        />
      </div>
    </div>
  );
} 