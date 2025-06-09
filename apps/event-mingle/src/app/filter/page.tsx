"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = ['Music', 'Tech', 'Art', 'Food', 'Outdoor'];
const mockEvents = [
  { id: 1, name: 'Sunset Rooftop Party', category: 'Music', date: '2024-06-10', location: 'Downtown' },
  { id: 2, name: 'Tech Networking', category: 'Tech', date: '2024-06-12', location: 'Tech Hub' },
  { id: 3, name: 'Yoga in the Park', category: 'Outdoor', date: '2024-06-15', location: 'Central Park' },
];

export default function FilterPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const filtered = mockEvents.filter(ev =>
    (selected.length === 0 || selected.includes(ev.category)) &&
    (!date || ev.date === date) &&
    (!location || ev.location.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <h1 className="text-2xl font-bold mb-4">Filter Events</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selected.includes(cat) ? 'default' : 'outline'}
            onClick={() => setSelected(sel => sel.includes(cat) ? sel.filter(c => c !== cat) : [...sel, cat])}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="rounded border px-2 py-1"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="rounded border px-2 py-1"
        />
      </div>
      <div className="flex gap-2 mb-6">
        <Button onClick={() => { setSelected([]); setDate(''); setLocation(''); }} variant="outline">Reset</Button>
        <Button>Apply</Button>
      </div>
      <h2 className="font-bold mb-2">Preview</h2>
      <div className="space-y-2 max-w-md">
        {filtered.length === 0 && <div className="text-gray-500">No events found.</div>}
        {filtered.map(ev => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-2">
              <CardContent>
                <div className="font-semibold">{ev.name}</div>
                <div className="text-xs text-gray-500">{ev.category} · {ev.date} · {ev.location}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
} 