'use client';

import { useState } from 'react';
import { forceRefreshContent } from '../lib/contentstack-helpers';

interface RefreshButtonProps {
  onRefresh?: () => void;
}

export default function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // Use the enhanced force refresh function
      await forceRefreshContent();
      
      // Call optional callback
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error refreshing content:', error);
      // Fallback to simple reload
      window.location.reload();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="fixed top-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors disabled:opacity-50"
      title="Refresh content from Contentstack"
    >
      {isRefreshing ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Refreshing...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </div>
      )}
    </button>
  );
} 