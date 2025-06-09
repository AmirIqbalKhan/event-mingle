"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const mockEvents = [
  { id: 1, name: 'Sunset Rooftop Party', date: '2024-06-10', location: 'Downtown' },
  { id: 2, name: 'Tech Networking', date: '2024-06-12', location: 'Tech Hub' },
  { id: 3, name: 'Yoga in the Park', date: '2024-06-15', location: 'Central Park' },
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const days = getMonthDays(year, month);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="flex items-center justify-between mb-4 max-w-md mx-auto">
        <Button variant="outline" onClick={() => setMonth(m => m === 0 ? 11 : m - 1)}>&larr;</Button>
        <h1 className="text-2xl font-bold">{today.toLocaleString('default', { month: 'long' })} {year}</h1>
        <Button variant="outline" onClick={() => setMonth(m => m === 11 ? 0 : m + 1)}>&rarr;</Button>
      </div>
      <div className="grid grid-cols-7 gap-1 max-w-md mx-auto mb-6">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="text-xs font-bold text-center">{d}</div>)}
        {days.map((d, i) => (
          <div key={i} className={`h-10 flex items-center justify-center rounded ${d ? 'bg-white dark:bg-gray-900' : ''}`}>{d || ''}</div>
        ))}
      </div>
      <div className="max-w-md mx-auto mb-4">
        <Button className="w-full mb-2">+ Add Event</Button>
        <h2 className="font-bold mb-2">Upcoming Events</h2>
        <div className="space-y-2">
          {mockEvents.map(ev => (
            <Card key={ev.id} className="p-2">
              <CardContent>
                <div className="font-semibold">{ev.name}</div>
                <div className="text-xs text-gray-500">{ev.date} · {ev.location}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 