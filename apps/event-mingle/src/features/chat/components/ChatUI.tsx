'use client';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface Message {
  from: string;
  content: string;
  timestamp: string;
}

const SOCKET_URL = typeof window !== 'undefined' ? (window as any).SOCKET_URL || 'http://localhost:3000' : '';

export default function ChatUI({ recipientId }: { recipientId: string }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session) return;
    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.emit('join:room', recipientId);

    socket.on('message:receive', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [recipientId, session]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;
    const msg = { to: recipientId, content: input };
    socketRef.current.emit('message:send', msg);
    setMessages((prev) => [
      ...prev,
      { from: session?.user?.id || 'me', content: input, timestamp: new Date().toISOString() },
    ]);
    setInput('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4 flex flex-col h-96">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === session?.user?.id ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded ${msg.from === session?.user?.id ? 'bg-blue-100' : 'bg-gray-200'}`}>{msg.content}</span>
            <div className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Send</button>
      </form>
    </div>
  );
} 