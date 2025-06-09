'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface NewChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onChatCreated: () => void;
}

export default function NewChatDialog({
  isOpen,
  onClose,
  onChatCreated,
}: NewChatDialogProps) {
  const [type, setType] = useState<'direct' | 'group'>('direct');
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Fetch users on search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to search users');
    }
  };

  // Create new chat
  const handleCreateChat = async () => {
    if (!session?.user?.id) {
      toast.error('Please sign in to create a chat');
      return;
    }

    if (type === 'direct' && selectedUsers.size !== 1) {
      toast.error('Please select exactly one user for direct chat');
      return;
    }

    if (type === 'group' && selectedUsers.size === 0) {
      toast.error('Please select at least one user for group chat');
      return;
    }

    if (type === 'group' && !name.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          name: type === 'group' ? name : undefined,
          participantIds: Array.from(selectedUsers),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      toast.success('Chat created successfully');
      onChatCreated();
      onClose();
    } catch (error) {
      toast.error('Failed to create chat');
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        if (type === 'direct') {
          newSet.clear();
        }
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">New Chat</h2>

            {/* Chat Type Selection */}
            <div className="mb-4">
              <Label>Chat Type</Label>
              <RadioGroup
                value={type}
                onValueChange={(value: string) => setType(value as 'direct' | 'group')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="direct" id="direct" />
                  <Label htmlFor="direct">Direct Message</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group">Group Chat</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Group Name Input */}
            {type === 'group' && (
              <div className="mb-4">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter group name"
                  className="mt-2"
                />
              </div>
            )}

            {/* User Search */}
            <div className="mb-4">
              <Label htmlFor="search">Search Users</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or email"
                className="mt-2"
              />
            </div>

            {/* User List */}
            <ScrollArea className="h-64 rounded-md border dark:border-gray-800 p-4">
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedUsers.has(user.id)
                        ? 'bg-blue-50 dark:bg-blue-900'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => toggleUser(user.id)}
                  >
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateChat}
                disabled={loading || (type === 'group' && !name.trim())}
              >
                {loading ? 'Creating...' : 'Create Chat'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
} 