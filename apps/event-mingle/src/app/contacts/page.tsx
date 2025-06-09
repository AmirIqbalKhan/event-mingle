"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const mockContacts = [
  { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'joined' },
  { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'invited' },
  { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', status: 'none' },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockContacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <h1 className="text-2xl font-bold mb-4">Invite Friends</h1>
      <Input
        placeholder="Search contacts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 max-w-md"
      />
      <div className="space-y-4 max-w-md mx-auto">
        {filtered.map((c) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex items-center gap-4 p-3">
              <Avatar>
                <img src={c.avatar} alt={c.name} />
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500">{c.status === 'joined' ? 'Joined' : c.status === 'invited' ? 'Invited' : 'Not Invited'}</div>
              </div>
              {c.status === 'none' && <Button size="sm">Invite</Button>}
              {c.status === 'invited' && <Button size="sm" variant="outline" disabled>Invited</Button>}
              {c.status === 'joined' && <Button size="sm" variant="secondary" disabled>Joined</Button>}
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
} 