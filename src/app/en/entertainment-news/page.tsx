import React from 'react';
import Link from 'next/link';

export default function EntertainmentNewsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entertainment News</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🎬 Latest Entertainment Updates</span>
            <span>•</span>
            <span>Celebrity News</span>
            <span>•</span>
            <span>Movie Updates</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Featured Story */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">🎬</span>
              <div>
                <h2 className="text-2xl font-bold">Bollywood Latest Updates</h2>
                <p className="text-purple-100">New movie releases, celebrity gossip, and industry news</p>
              </div>
            </div>
            <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">
                Get the latest updates from Bollywood, Hollywood, and the entertainment industry. 
                Stay updated with movie releases, celebrity news, and behind-the-scenes stories.
              </p>
            </div>
          </div>

          {/* News Content */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Latest Entertainment News</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">🎬 Movie Updates</h4>
                <p className="text-gray-700">Latest movie releases, box office updates, and upcoming film announcements. Bollywood and Hollywood news.</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⭐ Celebrity News</h4>
                <p className="text-gray-700">Latest celebrity gossip, interviews, and personal life updates. Red carpet events and award shows.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Entertainment Categories</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Bollywood - Hindi cinema and celebrities</li>
              <li>Hollywood - International movies and stars</li>
              <li>Television - TV shows and serials</li>
              <li>Music - Latest songs and artist updates</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Upcoming Releases</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Movie Releases</h4>
                  <p className="text-gray-600">Upcoming Bollywood and Hollywood movie releases</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">TV Shows</h4>
                  <p className="text-gray-600">New television series and reality shows</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🎭 Behind the Scenes</h4>
              <p className="text-gray-700">
                Get exclusive behind-the-scenes content, movie reviews, and entertainment industry insights. 
                Stay connected with your favorite stars and upcoming releases.
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
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              🎬 Movie Reviews
            </button>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              ⭐ Celebrity Interviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 