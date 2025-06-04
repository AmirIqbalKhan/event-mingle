'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OfflineManagerProps {
  onSync: () => Promise<void>;
}

export default function OfflineManager({ onSync }: OfflineManagerProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await onSync();
      setPendingChanges(0);
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-4"
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-sm font-medium text-gray-700">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {pendingChanges > 0 && (
            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                {pendingChanges} pending changes
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSync}
                disabled={isSyncing || !isOnline}
                className={`ml-4 px-3 py-1 rounded-lg text-sm font-medium ${
                  isOnline
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 