'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { toast } from 'react-hot-toast';

interface ChatWindowProps {
  chatId: string;
  initialMessages?: Message[];
  onClose: () => void;
}

export default function ChatWindow({
  chatId,
  initialMessages = [],
  onClose,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const {
    messages,
    loading,
    error,
    isConnected,
    sendMessage,
    sendTypingStatus,
  } = useChat({
    chatId,
    onNewMessage: () => {
      scrollToBottom();
    },
    onTyping: (userId, isTyping) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    },
  });

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage(newMessage);
      setNewMessage('');
      setIsTyping(false);
      sendTypingStatus(false);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      sendTypingStatus(true);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        sendTypingStatus(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isTyping, sendTypingStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={messages[0]?.sender?.image} alt={messages[0]?.sender?.name || 'Chat'} />
            <AvatarFallback>{messages[0]?.sender?.name?.[0] || 'C'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {messages[0]?.sender?.name || 'Chat'}
            </h3>
            {typingUsers.size > 0 && (
              <p className="text-sm text-gray-500">
                {Array.from(typingUsers).join(', ')} typing...
              </p>
            )}
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.senderId === session?.user?.id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.senderId === session?.user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t dark:border-gray-800 flex gap-2"
      >
        <Input
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="flex-1"
          disabled={!isConnected}
        />
        <Button type="submit" disabled={!isConnected || !newMessage.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
} 