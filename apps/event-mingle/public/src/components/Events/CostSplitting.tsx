'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  status: 'pending' | 'settled';
  createdAt: Date;
  category: ExpenseCategory;
}

interface Payment {
  id: string;
  expenseId: string;
  from: string;
  to: string;
  amount: number;
  status: 'pending' | 'completed';
  createdAt: Date;
}

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  balance: number; // positive means they are owed money, negative means they owe money
}

type ExpenseCategory = 'food' | 'transport' | 'accommodation' | 'activities' | 'other';

interface CostSplittingProps {
  attendees: Attendee[];
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
  onSettlePayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => Promise<void>;
}

const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; icon: string }[] = [
  { value: 'food', label: 'Food & Drinks', icon: '🍽️' },
  { value: 'transport', label: 'Transportation', icon: '🚗' },
  { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
  { value: 'activities', label: 'Activities', icon: '🎯' },
  { value: 'other', label: 'Other', icon: '📦' }
];

export default function CostSplitting({ attendees, onAddExpense, onSettlePayment }: CostSplittingProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isSettlingPayment, setIsSettlingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'expenses' | 'payments'>('expenses');

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    paidBy: '',
    splitBetween: [] as string[],
    category: 'other' as ExpenseCategory
  });

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy || newExpense.splitBetween.length === 0) {
      setError('Please fill in all fields');
      return;
    }

    setIsAddingExpense(true);
    setError(null);

    try {
      await onAddExpense({ ...newExpense, status: 'pending' });
      setNewExpense({
        description: '',
        amount: 0,
        paidBy: '',
        splitBetween: [],
        category: 'other'
      });
    } catch (error) {
      console.error('Failed to add expense:', error);
      setError('Failed to add expense. Please try again.');
    } finally {
      setIsAddingExpense(false);
    }
  };

  const handleSettlePayment = async (from: string, to: string, amount: number) => {
    setIsSettlingPayment(true);
    setError(null);

    try {
      await onSettlePayment({
        from,
        to,
        amount,
        status: 'pending',
        expenseId: '' // This would be set based on the specific expense being settled
      });
    } catch (error) {
      console.error('Failed to settle payment:', error);
      setError('Failed to settle payment. Please try again.');
    } finally {
      setIsSettlingPayment(false);
    }
  };

  const calculateBalances = () => {
    const balances = new Map<string, number>();
    attendees.forEach(attendee => balances.set(attendee.id, 0));

    expenses.forEach(expense => {
      const amountPerPerson = expense.amount / expense.splitBetween.length;
      balances.set(expense.paidBy, (balances.get(expense.paidBy) || 0) + expense.amount);
      expense.splitBetween.forEach(personId => {
        balances.set(personId, (balances.get(personId) || 0) - amountPerPerson);
      });
    });

    return balances;
  };

  const balances = calculateBalances();

  const getCategoryIcon = (category: ExpenseCategory) => {
    return EXPENSE_CATEGORIES.find(c => c.value === category)?.icon || '📦';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Splitting</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'expenses'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'payments'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payment History
          </button>
        </div>

        {activeTab === 'expenses' ? (
          <>
            {/* Add Expense Form */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What was the expense for?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {EXPENSE_CATEGORIES.map(category => (
                      <button
                        key={category.value}
                        onClick={() => setNewExpense(prev => ({ ...prev, category: category.value }))}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                          newExpense.category === category.value
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid By
                  </label>
                  <select
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, paidBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select person</option>
                    {attendees.map(attendee => (
                      <option key={attendee.id} value={attendee.id}>
                        {attendee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Split Between
                  </label>
                  <div className="space-y-2">
                    {attendees.map(attendee => (
                      <label key={attendee.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newExpense.splitBetween.includes(attendee.id)}
                          onChange={(e) => {
                            const newSplitBetween = e.target.checked
                              ? [...newExpense.splitBetween, attendee.id]
                              : newExpense.splitBetween.filter(id => id !== attendee.id);
                            setNewExpense(prev => ({ ...prev, splitBetween: newSplitBetween }));
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{attendee.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddExpense}
                  disabled={isAddingExpense}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAddingExpense ? 'Adding...' : 'Add Expense'}
                </motion.button>
              </div>
            </div>

            {/* Balances */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Balances</h3>
              <div className="space-y-2">
                {attendees.map(attendee => {
                  const balance = balances.get(attendee.id) || 0;
                  return (
                    <div
                      key={attendee.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={attendee.avatar}
                          alt={attendee.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium text-gray-900">{attendee.name}</span>
                      </div>
                      <span
                        className={`font-medium ${
                          balance > 0
                            ? 'text-green-600'
                            : balance < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {balance > 0 ? '+' : ''}
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Settle Payments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settle Payments</h3>
              <div className="space-y-4">
                {attendees.map(attendee => {
                  const balance = balances.get(attendee.id) || 0;
                  if (balance <= 0) return null;

                  return attendees.map(recipient => {
                    const recipientBalance = balances.get(recipient.id) || 0;
                    if (recipientBalance >= 0) return null;

                    const amount = Math.min(balance, -recipientBalance);
                    return (
                      <div
                        key={`${attendee.id}-${recipient.id}`}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700">
                            {recipient.name} pays {attendee.name}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSettlePayment(recipient.id, attendee.id, amount)}
                          disabled={isSettlingPayment}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Settle ${amount.toFixed(2)}
                        </motion.button>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
            {payments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No payment history yet</p>
            ) : (
              payments.map(payment => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={attendees.find(a => a.id === payment.from)?.avatar}
                        alt="From"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-700">→</span>
                      <img
                        src={attendees.find(a => a.id === payment.to)?.avatar}
                        alt="To"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        {attendees.find(a => a.id === payment.from)?.name} paid{' '}
                        {attendees.find(a => a.id === payment.to)?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                    <span
                      className={`text-sm ${
                        payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    >
                      {payment.status}
                    </span>
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