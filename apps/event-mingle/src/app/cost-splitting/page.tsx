"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const mockExpenses = [
  { id: 1, desc: 'Uber to event', amount: 24, paidBy: 'Me', splitWith: ['Alice', 'Bob'], status: 'pending' },
  { id: 2, desc: 'Pizza', amount: 30, paidBy: 'Alice', splitWith: ['Me', 'Bob'], status: 'paid' },
];

export default function CostSplittingPage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;
    setExpenses([
      ...expenses,
      { id: expenses.length + 1, desc, amount: parseFloat(amount), paidBy: 'Me', splitWith: ['Alice', 'Bob'], status: 'pending' },
    ]);
    setDesc('');
    setAmount('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <h1 className="text-2xl font-bold mb-4">Split Costs</h1>
      <form onSubmit={addExpense} className="flex gap-2 mb-6 max-w-md">
        <Input placeholder="Expense description" value={desc} onChange={e => setDesc(e.target.value)} />
        <Input placeholder="$" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-24" />
        <Button type="submit">Add</Button>
      </form>
      <div className="space-y-4 max-w-md mx-auto">
        {expenses.map(exp => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex items-center gap-4 p-3">
              <div className="flex-1">
                <div className="font-semibold">{exp.desc}</div>
                <div className="text-xs text-gray-500">Paid by {exp.paidBy} · Split with {exp.splitWith.join(', ')}</div>
              </div>
              <div className="font-bold">${exp.amount}</div>
              {exp.status === 'pending' && <Button size="sm" variant="outline">Settle</Button>}
              {exp.status === 'paid' && <Button size="sm" variant="secondary" disabled>Paid</Button>}
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <h2 className="font-bold mb-2">Summary</h2>
        <div className="text-gray-700 dark:text-gray-200 text-sm">You owe <span className="font-semibold">$12</span> to Alice, <span className="font-semibold">$8</span> to Bob.</div>
      </div>
    </main>
  );
} 