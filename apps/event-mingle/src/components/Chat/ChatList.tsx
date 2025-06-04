'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: {
    content: string;
    timestamp: Date;
    sender: string;
  };
  unreadCount: number;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

export default function ChatList({ chats, onSelectChat, selectedChatId }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-80 border-r bg-white">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-4 border-b hover:bg-gray-50 flex items-center space-x-4 ${
              selectedChatId === chat.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="relative w-12 h-12">
              <Image
                src={chat.participants[0].avatar}
                alt={chat.participants[0].name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {chat.participants.map((p) => p.name).join(', ')}
                </h3>
                <span className="text-xs text-gray-500">
                  {chat.lastMessage.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage.content}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {chat.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 