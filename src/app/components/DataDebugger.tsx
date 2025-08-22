'use client';

import { useState, useEffect } from 'react';

interface DataDebuggerProps {
  data: any[];
  title: string;
  dataType: string;
}

export default function DataDebugger({ data, title, dataType }: DataDebuggerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-yellow-800">
          🔍 Debug: {title} ({data?.length || 0} items)
        </h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-600 hover:text-yellow-800 text-sm"
        >
          {isExpanded ? 'Hide' : 'Show'} Details
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3">
          <div className="text-sm text-yellow-700 mb-2">
            <strong>Data Type:</strong> {dataType}
          </div>
          
          {data && data.length > 0 ? (
            <div className="space-y-2">
              {data.slice(0, 3).map((item, index) => (
                <div key={index} className="bg-white p-2 rounded border text-xs">
                  <div><strong>UID:</strong> {item.uid}</div>
                  <div><strong>Title:</strong> {item.title}</div>
                  <div><strong>Type:</strong> {item._content_type_uid || 'unknown'}</div>
                  <div><strong>Created:</strong> {item.created_at}</div>
                  <div><strong>Updated:</strong> {item.updated_at}</div>
                </div>
              ))}
              {data.length > 3 && (
                <div className="text-xs text-yellow-600">
                  ... and {data.length - 3} more items
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-yellow-600">
              No data available
            </div>
          )}
        </div>
      )}
    </div>
  );
}


