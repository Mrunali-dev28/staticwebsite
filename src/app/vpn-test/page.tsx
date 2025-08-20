'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalize } from '@/lib/use-personalize';
import { fetchUSNewsEntry, fetchMaharashtraNewsEntry } from '@/lib/personalize-service';

export default function VPNTestPage() {
  const [testResults, setTestResults] = useState<any>({});
  const personalizeData = usePersonalize();
  const { city, region, isLoading, error } = personalizeData || {};

  useEffect(() => {
    const runTests = async () => {
      const results: any = {
        location: { city, region, isLoading, error },
        timestamp: new Date().toISOString()
      };

      // Test US news fetching
      try {
        const usNews = await fetchUSNewsEntry();
        results.usNews = {
          success: !!usNews,
          data: usNews ? {
            id: usNews.id,
            title: usNews.content.title,
            description: usNews.content.description
          } : null
        };
      } catch (error) {
        results.usNews = { success: false, error: error.message };
      }

      // Test Maharashtra news fetching
      try {
        const maharashtraNews = await fetchMaharashtraNewsEntry();
        results.maharashtraNews = {
          success: !!maharashtraNews,
          data: maharashtraNews ? {
            id: maharashtraNews.id,
            title: maharashtraNews.content.title,
            description: maharashtraNews.content.description
          } : null
        };
      } catch (error) {
        results.maharashtraNews = { success: false, error: error.message };
      }

      setTestResults(results);
    };

    if (!isLoading) {
      runTests();
    }
  }, [city, region, isLoading, error]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔍 VPN Detection Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location Detection */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">📍 Location Detection</h2>
          <div className="space-y-2 text-sm">
            <div><strong>City:</strong> {city || 'Unknown'}</div>
            <div><strong>Region:</strong> {region || 'Unknown'}</div>
            <div><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</div>
            <div><strong>Error:</strong> {error || 'None'}</div>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">🧪 Test Results</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Timestamp:</strong> {testResults.timestamp}</div>
            <div><strong>US News:</strong> {testResults.usNews?.success ? '✅ Success' : '❌ Failed'}</div>
            <div><strong>Maharashtra News:</strong> {testResults.maharashtraNews?.success ? '✅ Success' : '❌ Failed'}</div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">📊 Detailed Results</h2>
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>

      {/* Test Links */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">🔗 Test Links</h2>
        <div className="space-y-2">
          <a href="/?forceUS=true" className="block text-blue-600 hover:underline">
            🔗 Force US Region (/?forceUS=true)
          </a>
          <a href="/?forceDelhi=true" className="block text-blue-600 hover:underline">
            🔗 Force Delhi Region (/?forceDelhi=true)
          </a>
          <a href="/?forceMaharashtra=true" className="block text-blue-600 hover:underline">
            🔗 Force Maharashtra Region (/?forceMaharashtra=true)
          </a>
        </div>
      </div>
    </div>
  );
}
