import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Chat {
  id: string;
  type: 'direct' | 'group';
  name: string;
  lastMessage?: {
    content: string;
    createdAt: string;
    sender: {
      name: string;
      profileImage: string;
    };
  };
  unreadCount: number;
}

export const ChatList: React.FC = () => {
  const router = useRouter();

  const { data: chats, isLoading } = useQuery<Chat[]>(
    'chats',
    async () => {
      const response = await axios.get('/api/chats');
      return response.data;
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {chats?.map((chat) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/chat/${chat.id}`)}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={chat.type === 'direct' ? chat.lastMessage?.sender.profileImage : '/group-avatar.png'}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {chat.name}
                </h3>
                {chat.lastMessage && (
                  <p className="text-xs text-gray-500">
                    {format(new Date(chat.lastMessage.createdAt), 'HH:mm')}
                  </p>
                )}
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {chat.type === 'group' && (
                    <span className="font-medium">
                      {chat.lastMessage.sender.name}:
                    </span>
                  )}{' '}
                  {chat.lastMessage.content}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 