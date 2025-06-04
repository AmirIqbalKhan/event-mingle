'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface CostSplitterProps {
  eventId: string;
  participants: string[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export default function CostSplitter({ eventId, participants, onAddExpense, onDeleteExpense }: CostSplitterProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  // Mock data
  const expenses: Expense[] = [
    {
      id: '1',
      description: 'Venue Rental',
      amount: 500,
      paidBy: 'John Doe',
      splitBetween: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      id: '2',
      description: 'Catering',
      amount: 300,
      paidBy: 'Jane Smith',
      splitBetween: ['John Doe', 'Jane Smith', 'Mike Johnson']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount && paidBy && selectedParticipants.length > 0) {
      onAddExpense({
        description,
        amount: parseFloat(amount),
        paidBy,
        splitBetween: selectedParticipants
      });
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSelectedParticipants([]);
    }
  };

  const toggleParticipant = (participant: string) => {
    setSelectedParticipants(prev =>
      prev.includes(participant)
        ? prev.filter(p => p !== participant)
        : [...prev, participant]
    );
  };

  const calculateSplits = () => {
    const splits: Record<string, { owes: number; paid: number }> = {};
    
    participants.forEach(participant => {
      splits[participant] = { owes: 0, paid: 0 };
    });

    expenses.forEach(expense => {
      const splitAmount = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach(participant => {
        splits[participant].owes += splitAmount;
      });
      splits[expense.paidBy].paid += expense.amount;
    });

    return splits;
  };

  const splits = calculateSplits();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Splitter</h2>

        {/* Add Expense Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's the expense for?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid By
              </label>
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select person</option>
                {participants.map(participant => (
                  <option key={participant} value={participant}>
                    {participant}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Split Between
              </label>
              <div className="space-y-2">
                {participants.map(participant => (
                  <label key={participant} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(participant)}
                      onChange={() => toggleParticipant(participant)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{participant}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Expense
            </motion.button>
          </div>
        </form>

        {/* Expenses List */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
          {expenses.map(expense => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                  <p className="text-sm text-gray-500">
                    Paid by {expense.paidBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    Split between {expense.splitBetween.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${(expense.amount / expense.splitBetween.length).toFixed(2)} each
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="mt-2 text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
          {Object.entries(splits).map(([participant, { owes, paid }]) => (
            <div key={participant} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">{participant}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Paid:</span>
                <span className="text-green-600">${paid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Owes:</span>
                <span className="text-red-600">${owes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-700">Balance:</span>
                <span className={paid - owes >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${(paid - owes).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 