import { fetchTrending, fetchTrendingEntry } from '@/lib/contentstack-helpers';
import { Trending } from '@/lib/contentstack';

interface TrendingExampleProps {
  trendingData?: Trending[];
  specificEntry?: Trending | null;
}

export default async function TrendingExample({ 
  trendingData, 
  specificEntry 
}: TrendingExampleProps) {
  // If no data provided, fetch it
  if (!trendingData) {
    trendingData = await fetchTrending();
  }

  if (!specificEntry) {
    // Try to fetch a specific entry (you can change this UID)
    specificEntry = await fetchTrendingEntry('blt0bcecbcc93c3b00e');
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Trending Data from CMS</h2>
      
      {/* All Trending Data */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">All Trending Entries ({trendingData.length})</h3>
        {trendingData.length > 0 ? (
          <div className="space-y-3">
            {trendingData.map((entry, index) => (
              <div key={entry.uid || index} className="border p-3 rounded">
                <h4 className="font-medium">{entry.title}</h4>
                <p className="text-sm text-gray-600">UID: {entry.uid}</p>
                {entry.modular_blocks && entry.modular_blocks.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Modular Blocks ({entry.modular_blocks.length}):</p>
                    <ul className="list-disc list-inside text-sm">
                      {entry.modular_blocks.map((block, blockIndex) => (
                        <li key={blockIndex}>
                          {block.link?.title} - {block.link?.href}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No trending entries found</p>
        )}
      </div>

      {/* Specific Entry */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Specific Trending Entry</h3>
        {specificEntry ? (
          <div className="border p-3 rounded">
            <h4 className="font-medium">{specificEntry.title}</h4>
            <p className="text-sm text-gray-600">UID: {specificEntry.uid}</p>
            {specificEntry.modular_blocks && specificEntry.modular_blocks.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Modular Blocks ({specificEntry.modular_blocks.length}):</p>
                <ul className="list-disc list-inside text-sm">
                  {specificEntry.modular_blocks.map((block, blockIndex) => (
                    <li key={blockIndex}>
                      {block.link?.title} - {block.link?.href}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Specific entry not found</p>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">How to Use Trending Data</h3>
        <div className="text-sm space-y-2">
          <p><strong>1. Fetch all trending data:</strong></p>
          <code className="bg-gray-200 p-1 rounded text-xs block">
            const trendingData = await fetchTrending();
          </code>
          
          <p><strong>2. Fetch a specific trending entry:</strong></p>
          <code className="bg-gray-200 p-1 rounded text-xs block">
            const entry = await fetchTrendingEntry('your-uid-here');
          </code>
          
          <p><strong>3. Fetch trending with criteria:</strong></p>
          <code className="bg-gray-200 p-1 rounded text-xs block">
            const filtered = await fetchTrendingWithCriteria(&#123; limit: 5 &#125;);
          </code>
          
          <p><strong>4. List all available trending entries:</strong></p>
          <code className="bg-gray-200 p-1 rounded text-xs block">
            const allEntries = await listAllTrendingEntries();
          </code>
        </div>
      </div>
    </div>
  );
} 