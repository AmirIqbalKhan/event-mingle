"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const mockUser = {
  name: 'Jane Doe',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  interests: ['Music', 'Tech', 'Art', 'Food'],
  history: [
    { id: 1, name: 'Sunset Rooftop Party', date: '2024-06-10' },
    { id: 2, name: 'Tech Networking', date: '2024-06-12' },
  ],
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 mb-2">
          <img src={mockUser.avatar} alt={mockUser.name} />
        </Avatar>
        <div className="text-2xl font-bold mb-1">{mockUser.name}</div>
        <div className="flex gap-2 mb-2 flex-wrap justify-center">
          {mockUser.interests.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        <Button>Edit Profile</Button>
      </motion.div>
      <div className="w-full max-w-md">
        <h2 className="font-bold mb-2">Event History</h2>
        <div className="space-y-2">
          {mockUser.history.map(ev => (
            <Card key={ev.id} className="p-2">
              <CardContent>
                <div className="font-semibold">{ev.name}</div>
                <div className="text-xs text-gray-500">{ev.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 