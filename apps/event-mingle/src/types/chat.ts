export interface User {
  id: string;
  name: string;
  image?: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender?: User;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
}

export interface ChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
  user: User;
}

export interface ChatInvitation {
  id: string;
  chatId: string;
  inviterId: string;
  inviteeId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
} 