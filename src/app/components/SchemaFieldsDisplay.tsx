import React from 'react';
import { fetchNewsChannelWithModularBlocks, fetchAllNewsChannelEntries } from '../../lib/contentstack-helpers';

// Complete TypeScript interfaces
interface ContentstackAsset {
  url: string;
  title?: string;
  filename?: string;
  content_type?: string;
  file_size?: number;
  uid: string;
  description?: string;
}

interface LinkField {
  title: string;
  url: string;
}

interface TaxonomyTerm {
  uid: string;
  name: string;
  parent_uid?: string;
}

interface NewsChannelEntry {
  title: string;
  url?: string;
  date?: string;
  boolean?: boolean;
  number?: number;
  link?: LinkField;
  file?: ContentstackAsset;
  taxonomies?: TaxonomyTerm[];
  uid: string;
  _metadata?: Record<string, unknown>;
}

// Component to display all schema fields with real data
export default async function SchemaFieldsDisplay() {
  // Fetch real data from Contentstack
  const [mainEntry, allEntries] = await Promise.all([
    fetchNewsChannelWithModularBlocks(process.env.ENTRYUID || 'blt0171967259c79e5c'),
    fetchAllNewsChannelEntries()
  ]);

  // Use real data or fallback
  const entry: NewsChannelEntry = (mainEntry as NewsChannelEntry) || {
    title: "Aaj Tak",
    url: "https://aajtak.com",
    date: new Date().toISOString(),
    boolean: true,
    number: 24,
    link: { 
      title: "Watch Live Stream", 
      url: "https://live.aajtak.com" 
    },
    uid: "news_channel"
  };

  const hasRealData = Boolean(mainEntry && allEntries.length > 0);

  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Field 1: Title */}
        <div className="bg-white border-l-4 border-blue-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 1</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;text&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">📝 Title</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">Mandatory, Unique</p>
          <p className="text-blue-600 font-bold text-lg">{entry.title}</p>
        </div>

        {/* Field 2: URL */}
        <div className="bg-white border-l-4 border-green-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 2</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;text&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">🌐 URL</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">Optional</p>
          <p className="text-green-600 font-bold text-lg break-all">{entry.url || 'Not set'}</p>
        </div>

        {/* Field 3: Date */}
        <div className="bg-white border-l-4 border-purple-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 3</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;isodate&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">📅 Date</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">ISO Date Format</p>
          <p className="text-purple-600 font-bold text-lg">
            {entry.date ? new Date(entry.date).toLocaleDateString() : 'Not set'}
          </p>
        </div>

        {/* Field 4: Boolean */}
        <div className="bg-white border-l-4 border-orange-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 4</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;boolean&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">🔘 Boolean</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">True/False Value</p>
          <p className="text-orange-600 font-bold text-lg">
            {entry.boolean ? 'True' : 'False'}
          </p>
        </div>

        {/* Field 5: Number */}
        <div className="bg-white border-l-4 border-red-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 5</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;number&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">🔢 Number</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">Numeric Value</p>
          <p className="text-red-600 font-bold text-lg">
            {entry.number || 'Not set'}
          </p>
        </div>

        {/* Field 6: Link */}
        <div className="bg-white border-l-4 border-indigo-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">FIELD 6</span>
            <span className="text-sm text-gray-500 font-medium">data_type: &quot;link&quot;</span>
            {hasRealData ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">✓ Live</span>
            ) : null}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">🔗 Link</h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">URL Reference</p>
          <div className="text-indigo-600 font-bold text-lg">
            {entry.link ? (
              <div>
                <div className="font-semibold">{entry.link.title}</div>
                <div className="text-sm break-all">{entry.link.url}</div>
              </div>
            ) : (
              'Not set'
            )}
          </div>
        </div>
      </div>

      {/* Data Source Indicator */}
      <div className="mt-8 text-center">
        {hasRealData ? (
          <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl px-6 py-3 shadow-lg">
            <span className="text-green-700 font-semibold">✓ Connected to Contentstack CMS</span>
            <span className="ml-3 text-green-600 text-sm">Real-time data from {allEntries.length} entries</span>
          </div>
        ) : (
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl px-6 py-3 shadow-lg">
            <span className="text-yellow-700 font-semibold">⚠ Using Fallback Data</span>
            <span className="ml-3 text-yellow-600 text-sm">Connect to Contentstack for live data</span>
          </div>
        )}
      </div>
    </section>
  );
}