import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';
import { Message, Chat } from '@/types/chat';
import { toast } from 'react-hot-toast';

interface UseChatProps {
  chatId: string;
  onNewMessage?: (message: Message) => void;
  onTyping?: (userId: string, isTyping: boolean) => void;
}

export function useChat({ chatId, onNewMessage, onTyping }: UseChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Initialize socket connection
  useEffect(() => {
    if (!session?.user?.id) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        userId: session.user.id,
      },
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('join-chat', chatId);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('new-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      onNewMessage?.(message);
    });

    socketInstance.on('typing', ({ userId, isTyping }) => {
      onTyping?.(userId, isTyping);
    });

    socketInstance.on('error', (error: string) => {
      setError(error);
      toast.error(error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [chatId, session?.user?.id, onNewMessage, onTyping]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chats/${chatId}/messages`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch messages');
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!socket || !isConnected) {
        toast.error('Not connected to chat server');
        return;
      }

      try {
        const response = await fetch(`/api/chats/${chatId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const message = await response.json();
        socket.emit('new-message', { chatId, message });
      } catch (error) {
        toast.error('Failed to send message');
      }
    },
    [socket, isConnected, chatId]
  );

  // Send typing status
  const sendTypingStatus = useCallback(
    (isTyping: boolean) => {
      if (!socket || !isConnected) return;
      socket.emit('typing', { chatId, isTyping });
    },
    [socket, isConnected, chatId]
  );

  return {
    messages,
    loading,
    error,
    isConnected,
    sendMessage,
    sendTypingStatus,
  };
} 