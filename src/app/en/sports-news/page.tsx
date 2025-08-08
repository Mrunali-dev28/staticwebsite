import React from 'react';
import Link from 'next/link';

export default function SportsNewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/en" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports News</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>⚽ Latest Sports Updates</span>
            <span>•</span>
            <span>Match Results</span>
            <span>•</span>
            <span>Player News</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Featured Story */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h2 className="text-2xl font-bold">Cricket World Cup Updates</h2>
                <p className="text-green-100">Latest scores, highlights, and team performances</p>
              </div>
            </div>
            <div className="bg-green-500 bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">
                Stay updated with the latest cricket matches, player performances, and tournament highlights. 
                Get real-time scores and expert analysis.
              </p>
            </div>
          </div>

          {/* News Content */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Latest Sports News</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🏏 Cricket Updates</h4>
                <p className="text-gray-700">Latest cricket matches, player performances, and tournament updates. IPL, international cricket, and domestic cricket news.</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">⚽ Football News</h4>
                <p className="text-gray-700">Latest football matches, transfer news, and international football updates. Premier League, La Liga, and other major leagues.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Sports Categories</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Cricket - International and domestic matches</li>
              <li>Football - Major leagues and tournaments</li>
              <li>Tennis - Grand Slams and ATP/WTA tours</li>
              <li>Olympics and Commonwealth Games</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Player Updates</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Cricket Stars</h4>
                  <p className="text-gray-600">Updates on Virat Kohli, Rohit Sharma, and other cricket stars</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Football Players</h4>
                  <p className="text-gray-600">Latest on Messi, Ronaldo, and other football legends</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📺 Live Coverage</h4>
              <p className="text-gray-700">
                Get live match updates, expert commentary, and post-match analysis. 
                Stay connected with your favorite sports and athletes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/en" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              📺 Live Matches
            </button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
              🏆 Tournament Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 