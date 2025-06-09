'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Chat } from '@/types/chat';
import ChatWindow from '@/components/Chat/ChatWindow';
import { toast } from 'react-hot-toast';

export default function MessagePage() {
  const { chatId } = useParams();
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(`/api/chats/${chatId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chat');
        }
        const data = await response.json();
        setChat(data);
      } catch (error) {
        toast.error('Failed to load chat');
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChat();
    }
  }, [chatId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Chat not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full"
    >
      <ChatWindow
        chatId={chat.id}
        initialMessages={chat.messages}
        onClose={() => window.history.back()}
      />
    </motion.div>
  );
} 