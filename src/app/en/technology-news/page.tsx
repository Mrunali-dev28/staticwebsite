import React from 'react';
import Link from 'next/link';

export default function TechnologyNewsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Technology News</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>💻 Latest Tech Updates</span>
            <span>•</span>
            <span>Gadget Reviews</span>
            <span>•</span>
            <span>AI & Innovation</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Featured Story */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h2 className="text-2xl font-bold">AI & Machine Learning</h2>
                <p className="text-blue-100">Latest developments in artificial intelligence and tech innovation</p>
              </div>
            </div>
            <div className="bg-blue-500 bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">
                Stay updated with the latest technology trends, gadget launches, and AI developments. 
                Get insights into the future of technology and digital transformation.
              </p>
            </div>
          </div>

          {/* News Content */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Latest Technology News</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📱 Gadget Reviews</h4>
                <p className="text-gray-700">Latest smartphone launches, laptop reviews, and gadget comparisons. Get expert opinions on new tech products.</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🤖 AI & Innovation</h4>
                <p className="text-gray-700">Latest developments in artificial intelligence, machine learning, and cutting-edge technology innovations.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Tech Categories</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Smartphones - Latest mobile phone launches and reviews</li>
              <li>Laptops & Computers - PC hardware and software updates</li>
              <li>Artificial Intelligence - AI developments and applications</li>
              <li>Startups - Tech startup news and funding updates</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Upcoming Launches</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Smartphones</h4>
                  <p className="text-gray-600">Upcoming iPhone, Samsung, and other smartphone launches</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Software Updates</h4>
                  <p className="text-gray-600">Latest OS updates, app releases, and software innovations</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🔮 Future Tech</h4>
              <p className="text-gray-700">
                Explore the future of technology with insights into emerging trends, 
                breakthrough innovations, and the next generation of digital solutions.
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
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              📱 Gadget Reviews
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              🤖 AI Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 