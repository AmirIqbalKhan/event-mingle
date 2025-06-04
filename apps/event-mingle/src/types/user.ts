export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  interests: string[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  chatNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  createdAt: string;
  updatedAt: string;
} 