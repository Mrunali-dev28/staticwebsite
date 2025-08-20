'use client';

import React, { useState, useEffect } from 'react';
import { fetchUSNews, fetchHindiUSNews, fetchSpecificUSNewsEntry, fetchHindiNewsChannelEntries } from '@/lib/contentstack-helpers';

export default function TestUSNewsPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const results: any = {};

    try {
      // Test 1: Fetch general US news
      console.log('🧪 Test 1: Fetching general US news...');
      const generalUSNews = await fetchUSNews();
      results.generalUSNews = {
        count: generalUSNews?.length || 0,
        entries: generalUSNews?.slice(0, 3) || [] // Show first 3 entries
      };
      console.log('✅ General US news result:', results.generalUSNews);

      // Test 2: Fetch Hindi US news
      console.log('🧪 Test 2: Fetching Hindi US news...');
      const hindiUSNews = await fetchHindiUSNews();
      results.hindiUSNews = {
        count: hindiUSNews?.length || 0,
        entries: hindiUSNews?.slice(0, 3) || [] // Show first 3 entries
      };
      console.log('✅ Hindi US news result:', results.hindiUSNews);

      // Test 3: Fetch specific US news entry
      console.log('🧪 Test 3: Fetching specific US news entry...');
      const specificEntry = await fetchSpecificUSNewsEntry('blte933ca60d09a6b6c', 'csd7cbbc175c7a995f');
      results.specificEntry = specificEntry;
      console.log('✅ Specific entry result:', results.specificEntry);

      // Test 4: Fetch Hindi news channel entries
      console.log('🧪 Test 4: Fetching Hindi news channel entries...');
      const hindiNewsChannelEntries = await fetchHindiNewsChannelEntries();
      results.hindiNewsChannelEntries = {
        count: hindiNewsChannelEntries?.length || 0,
        entries: hindiNewsChannelEntries?.slice(0, 3) || [] // Show first 3 entries
      };
      console.log('✅ Hindi news channel entries result:', results.hindiNewsChannelEntries);

    } catch (error) {
      console.error('❌ Test error:', error);
      results.error = error;
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧪 US News & Hindi Content Fetch Test</h1>
      
      <button 
        onClick={runTests}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 disabled:opacity-50"
      >
        {isLoading ? 'Running Tests...' : 'Run All Tests'}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div className="space-y-6">
          {/* General US News */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">General US News</h2>
            <p>Count: {testResults.generalUSNews?.count || 0}</p>
            {testResults.generalUSNews?.entries?.length > 0 ? (
              <div className="mt-2">
                <h3 className="font-medium">First 3 entries:</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(testResults.generalUSNews.entries, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No entries found</p>
            )}
          </div>

          {/* Hindi US News */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Hindi US News</h2>
            <p>Count: {testResults.hindiUSNews?.count || 0}</p>
            {testResults.hindiUSNews?.entries?.length > 0 ? (
              <div className="mt-2">
                <h3 className="font-medium">First 3 entries:</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(testResults.hindiUSNews.entries, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No entries found</p>
            )}
          </div>

          {/* Hindi News Channel Entries */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Hindi News Channel Entries</h2>
            <p>Count: {testResults.hindiNewsChannelEntries?.count || 0}</p>
            {testResults.hindiNewsChannelEntries?.entries?.length > 0 ? (
              <div className="mt-2">
                <h3 className="font-medium">First 3 entries:</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(testResults.hindiNewsChannelEntries.entries, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No entries found</p>
            )}
          </div>

          {/* Specific Entry */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Specific Entry (blte933ca60d09a6b6c)</h2>
            {testResults.specificEntry ? (
              <div>
                <p className="text-green-600">✅ Entry found!</p>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(testResults.specificEntry, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600">❌ Entry not found</p>
            )}
          </div>

          {/* Error */}
          {testResults.error && (
            <div className="border border-red-300 rounded p-4 bg-red-50">
              <h2 className="text-lg font-semibold mb-2 text-red-700">Error</h2>
              <pre className="text-red-600 text-sm overflow-auto">
                {JSON.stringify(testResults.error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
