import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, Loader2 } from 'lucide-react';

export function SyncStatus() {
  const [syncState, setSyncState] = useState<null | 0 | 1>(null);

  useEffect(() => {
    const checkSyncState = async () => {
      if (window.utools?.db) {
        const state = await window.utools.db.promises.replicateStateFromCloud();
        setSyncState(state);
      }
    };

    // 初始检查
    checkSyncState();

    // 定期检查同步状态
    const interval = setInterval(checkSyncState, 2000);
    return () => clearInterval(interval);
  }, []);

  if (syncState === null) {
    return (
      <div className="flex items-center text-gray-500 text-sm">
        <CloudOff className="w-4 h-4 mr-1" />
        未开启云同步
      </div>
    );
  }

  if (syncState === 1) {
    return (
      <div className="flex items-center text-blue-500 text-sm">
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        同步中...
      </div>
    );
  }

  return (
    <div className="flex items-center text-green-500 text-sm">
      <Cloud className="w-4 h-4 mr-1" />
      已同步
    </div>
  );
}