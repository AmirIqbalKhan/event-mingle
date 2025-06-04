'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Chat } from '@/types/chat';

export default function ChatPage() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchChats();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chats</h1>

        {chats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No chats yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Start chatting with people you match with at events
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12">
                      <img
                        src={chat.event.image}
                        alt={chat.event.title}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{chat.event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {chat.participants.length} participants
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 