'use client';

import OfflineManager from './OfflineManager';

export default function OfflineManagerWrapper() {
  const handleSync = async () => {
    // TODO: Implement sync logic
    console.log('Syncing data...');
  };

  return <OfflineManager onSync={handleSync} />;
} 