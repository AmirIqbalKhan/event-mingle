'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Chat } from '@/types/chat';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'react-hot-toast';
import NewChatDialog from './NewChatDialog';

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    fetchChats();
  }, [session?.user?.id]);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const filteredChats = chats.filter((chat) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      chat.name?.toLowerCase().includes(searchLower) ||
      chat.participants.some((p) =>
        p.name.toLowerCase().includes(searchLower)
      )
    );
  });

  const getLastMessage = (chat: Chat) => {
    if (!chat.messages || chat.messages.length === 0) {
      return 'No messages yet';
    }
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage.content;
  };

  const getUnreadCount = (chat: Chat) => {
    if (!chat.messages) return 0;
    return chat.messages.filter(
      (m) => !m.read && m.senderId !== session?.user?.id
    ).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b dark:border-gray-800">
        <Input
          type="search"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="divide-y dark:divide-gray-800">
          {filteredChats.map((chat) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onSelectChat(chat.id)}
              className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={chat.type === 'direct' ? chat.participants[0]?.image : undefined}
                    alt={chat.name || 'Group Chat'}
                  />
                  <AvatarFallback>
                    {chat.type === 'direct'
                      ? chat.participants[0]?.name?.[0]
                      : chat.name?.[0] || 'G'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">
                      {chat.type === 'direct'
                        ? chat.participants[0]?.name
                        : chat.name}
                    </h3>
                    {getUnreadCount(chat) > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {getUnreadCount(chat)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {getLastMessage(chat)}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      {/* New Chat Button */}
      <div className="p-4 border-t dark:border-gray-800">
        <Button
          onClick={() => setIsNewChatOpen(true)}
          className="w-full"
        >
          New Chat
        </Button>
      </div>

      {/* New Chat Dialog */}
      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onChatCreated={fetchChats}
      />
    </div>
  );
} 