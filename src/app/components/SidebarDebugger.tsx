'use client';

import { useState } from 'react';

interface SidebarDebuggerProps {
  sidebarNews: any[];
}

export default function SidebarDebugger({ sidebarNews }: SidebarDebuggerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-red-800">
          🔍 Sidebar News Debug ({sidebarNews?.length || 0} items)
        </h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          {isExpanded ? 'Hide' : 'Show'} Details
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3">
          <div className="text-sm text-red-700 mb-2">
            <strong>Filtered Entry:</strong> blt54a9e6762def9a93 (excluded)
          </div>
          
          {sidebarNews && sidebarNews.length > 0 ? (
            <div className="space-y-2">
              {sidebarNews.map((item, index) => (
                <div key={index} className="bg-white p-2 rounded border text-xs">
                  <div><strong>UID:</strong> {item.uid}</div>
                  <div><strong>Title:</strong> {item.title}</div>
                  <div><strong>Type:</strong> {item._content_type_uid || 'unknown'}</div>
                  <div><strong>Status:</strong> {item.uid === 'blt54a9e6762def9a93' ? '❌ EXCLUDED' : '✅ INCLUDED'}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-red-600">
              No sidebar news available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
