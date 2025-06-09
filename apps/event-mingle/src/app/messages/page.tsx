'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import ChatList from '@/components/Chat/ChatList';
import ChatWindow from '@/components/Chat/ChatWindow';
import { Chat } from '@/types/chat';
import { toast } from 'react-hot-toast';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSelectChat = async (chatId: string) => {
    if (!session?.user?.id) {
      toast.error('Please sign in to view chats');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat details');
      }
      const chat = await response.json();
      setSelectedChat(chat);
    } catch (error) {
      toast.error('Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat List */}
      <div className="w-80 border-r dark:border-gray-800">
        <ChatList onSelectChat={handleSelectChat} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </motion.div>
          ) : selectedChat ? (
            <motion.div
              key={selectedChat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <ChatWindow
                chatId={selectedChat.id}
                initialMessages={selectedChat.messages}
                onClose={() => setSelectedChat(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center text-gray-500"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No chat selected</h3>
                <p className="text-sm">
                  Select a chat from the list to start messaging
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 