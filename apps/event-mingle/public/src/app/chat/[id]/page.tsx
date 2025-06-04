'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'next/navigation';
import { ChatList } from '@/features/chat/components/ChatList';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'file';
  createdAt: string;
  sender: {
    id: string;
    name: string;
    profileImage: string;
  };
  isRead: boolean;
}

export default function ChatPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, refetch } = useQuery<Message[]>(
    ['messages', id],
    async () => {
      const response = await axios.get(`/api/chats/${id}/messages`);
      return response.data;
    }
  );

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join', chatId: id }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        refetch();
      }
    };

    return () => {
      socket.close();
    };
  }, [id, refetch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMessageSent = () => {
    refetch();
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please sign in to access the chat</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-200">
        <ChatList />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages?.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.sender.id === session.user.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput chatId={id as string} onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
} 