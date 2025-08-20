'use client';

import { useState } from 'react';
import { checkSpecificEntry } from '@/lib/contentstack-helpers';

export default function EntryChecker() {
  const [uid, setUid] = useState('blt54a9e6762def9a93');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkEntry = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch(`/api/check-entry/${uid}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to check entry', details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contentstack Entry Checker</h2>
      <p className="text-sm text-gray-600 mb-4">
        Currently checking: <strong>blt54a9e6762def9a93</strong> (sidebar_news)
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Entry UID:</label>
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Contentstack entry UID"
        />
      </div>
      
      <button
        onClick={checkEntry}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Entry'}
      </button>
      
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
