'use client';

import { useState } from 'react';
import CostSplitter from '@/components/Events/CostSplitter';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

// Mock data
const mockParticipants = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Wilson'
];

export default function EventExpensesPage({ params }: { params: { id: string } }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    // TODO: Implement expense addition logic
    console.log('Adding expense:', expense);
    setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  };

  const handleDeleteExpense = (expenseId: string) => {
    // TODO: Implement expense deletion logic
    console.log('Deleting expense:', expenseId);
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Event Expenses - Event ID: {params.id}
        </h1>

        <CostSplitter
          eventId={params.id}
          participants={mockParticipants}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </div>
  );
} 