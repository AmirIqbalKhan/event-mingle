import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface ChatInputProps {
  chatId: string;
  onMessageSent: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ chatId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/*': ['.pdf', '.doc', '.docx'],
    },
    onDrop: async (acceptedFiles) => {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('chatId', chatId);

        const response = await axios.post('/api/upload', formData);
        await sendMessage(response.data.url, getFileType(acceptedFiles[0].type));
        toast.success('File uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload file');
      } finally {
        setIsUploading(false);
      }
    },
  });

  const getFileType = (mimeType: string): 'image' | 'file' => {
    return mimeType.startsWith('image/') ? 'image' : 'file';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
        const formData = new FormData();
        formData.append('file', audioBlob);
        formData.append('chatId', chatId);

        try {
          const response = await axios.post('/api/upload', formData);
          await sendMessage(response.data.url, 'voice');
          toast.success('Voice message sent');
        } catch (error) {
          toast.error('Failed to send voice message');
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast.error('Failed to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'voice' | 'file' = 'text') => {
    try {
      await axios.post('/api/messages', {
        chatId,
        content,
        type,
      });
      setMessage('');
      onMessageSent();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div
          {...getRootProps()}
          className={`flex-1 flex items-center space-x-2 p-2 border rounded-lg ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input
            {...getInputProps()}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            className="p-2 text-gray-500 hover:text-gray-700"
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
          </button>
        </div>

        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full ${
            isRecording
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.button>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          disabled={!message.trim() || isUploading}
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.button>
      </form>
    </div>
  );
}; 