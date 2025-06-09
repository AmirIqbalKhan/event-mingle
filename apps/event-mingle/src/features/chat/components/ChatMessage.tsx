import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isOwnMessage,
}) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative w-64 h-48">
            <Image
              src={message.content}
              alt="Message image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        );
      case 'voice':
        return (
          <audio controls className="w-64">
            <source src={message.content} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case 'file':
        return (
          <a
            href={message.content}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <span>Download File</span>
          </a>
        );
      default:
        return <p className="text-gray-800">{message.content}</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {!isOwnMessage && (
          <div className="relative w-8 h-8">
            <Image
              src={message.sender.profileImage}
              alt={message.sender.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div
          className={`max-w-xs px-4 py-2 rounded-lg ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {!isOwnMessage && (
            <p className="text-xs font-medium text-gray-500 mb-1">
              {message.sender.name}
            </p>
          )}
          {renderMessageContent()}
          <div
            className={`text-xs mt-1 ${
              isOwnMessage ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            {format(new Date(message.createdAt), 'HH:mm')}
            {isOwnMessage && (
              <span className="ml-1">
                {message.isRead ? '✓✓' : '✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 