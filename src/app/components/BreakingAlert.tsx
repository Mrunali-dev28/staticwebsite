import React from 'react';
import { BreakingAlert } from '@/lib/contentstack';

interface BreakingAlertProps {
  breakingAlerts: BreakingAlert[];
}

export default function BreakingAlertComponent({ breakingAlerts }: BreakingAlertProps) {
  if (!breakingAlerts || breakingAlerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 mb-6 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <h3 className="font-bold text-lg">Breaking News</h3>
              <p className="text-red-100 text-sm">
                {breakingAlerts.length} alert{breakingAlerts.length !== 1 ? 's' : ''} active
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              LIVE
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {breakingAlerts.map((alert) => (
            <div key={alert.uid} className="bg-red-500 bg-opacity-30 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{alert.title}</h4>
                  {alert.rich_text_editor && (
                    <p className="text-red-100 text-sm mb-2">
                      {alert.rich_text_editor}
                    </p>
                  )}
                  {alert.link && (
                    <a 
                      href={alert.link.url}
                      className="inline-flex items-center text-red-200 hover:text-white text-sm font-medium"
                    >
                      Read More →
                    </a>
                  )}
                </div>
                {alert.boolean && (
                  <span className="bg-green-500 px-2 py-1 rounded text-xs font-bold ml-2">
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 