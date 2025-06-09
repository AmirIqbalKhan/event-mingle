"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const steps = [
  'Event Details',
  'Date & Time',
  'Location',
  'Invite Friends',
];

export default function CreateEventPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', desc: '', date: '', time: '', location: '', invitees: '' });

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Create Event</h1>
          <Progress value={((step + 1) / steps.length) * 100} className="mb-4" />
          <div className="mb-6 text-lg font-semibold">{steps[step]}</div>
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Event Name" className="mb-3" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Input placeholder="Description" className="mb-3" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Date" type="date" className="mb-3" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              <Input placeholder="Time" type="time" className="mb-3" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Location" className="mb-3" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Invitees (comma separated)" className="mb-3" value={form.invitees} onChange={e => setForm(f => ({ ...f, invitees: e.target.value }))} />
            </motion.div>
          )}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={prev} disabled={step === 0}>Back</Button>
            {step < steps.length - 1 ? (
              <Button onClick={next}>Next</Button>
            ) : (
              <Button type="submit">Create Event</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
} 