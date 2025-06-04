'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  interests: string[];
  eventsAttended: number;
  eventsCreated: number;
}

// Temporary mock data
const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/images/avatars/john.jpg',
  bio: 'Tech enthusiast and event organizer. Love meeting new people and sharing knowledge.',
  interests: ['Technology', 'Networking', 'Music', 'Travel'],
  eventsAttended: 15,
  eventsCreated: 5
};

export default function ProfilePage() {
  const [profile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(profile.bio);

  const handleSaveProfile = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">{profile.bio}</p>
              )}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900">{profile.eventsAttended}</h3>
                <p className="text-gray-600">Events Attended</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900">{profile.eventsCreated}</h3>
                <p className="text-gray-600">Events Created</p>
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 