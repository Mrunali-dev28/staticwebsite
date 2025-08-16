import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Define category information
  const categories = {
    politics: {
      title: 'Politics',
      description: 'Latest political news, government updates, and policy developments from around the world',
      color: 'bg-red-100 border-red-300'
    },
    sports: {
      title: 'Sports',
      description: 'Breaking sports news, match results, player updates, and athletic achievements across all sports',
      color: 'bg-green-100 border-green-300'
    },
    entertainment: {
      title: 'Entertainment',
      description: 'Celebrity news, movie releases, music updates, and entertainment industry insights',
      color: 'bg-purple-100 border-purple-300'
    },
    technology: {
      title: 'Technology',
      description: 'Latest tech innovations, gadget reviews, software updates, and digital transformation news',
      color: 'bg-blue-100 border-blue-300'
    }
  };

  const category = categories[slug as keyof typeof categories];
  
  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className={`${category.color} border rounded-lg p-8 mb-8`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.title}
            </h1>
            <p className="text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto">
              {category.description}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-80 text-gray-700">
                📰 Latest News
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-80 text-gray-700">
                🔥 Breaking Updates
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-80 text-gray-700">
                📊 Expert Analysis
              </span>
            </div>
          </div>
        </div>

        {/* Category Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Lifestyle Content for Politics */}
              {slug === 'politics' && (
                <>
                  {/* Rakshabandhan Chocolate Recipe */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🍫</div>
                        <div className="text-2xl mb-2">🕯️</div>
                        <div className="text-xl">🎀</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Rakshabandhan Chocolate Recipes
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Make this Rakshabandhan chocolaty with these homemade chocolate recipes. Try them this Rakhi!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Lifestyle</span>
                        <span className="text-sm text-blue-600">Read More →</span>
                      </div>
                    </div>
                  </div>

                  {/* Dark Circles Remedy */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">👁️</div>
                        <div className="text-2xl mb-2">💆‍♀️</div>
                        <div className="text-xl">✨</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Dark Circles Home Remedies
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Have dark circles appeared under your eyes? These home remedies can help you get rid of them.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Beauty</span>
                        <span className="text-sm text-blue-600">Read More →</span>
                      </div>
                    </div>
                  </div>

                  {/* Homemade Chocolates */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🍫</div>
                        <div className="text-2xl mb-2">🥜</div>
                        <div className="text-xl">🎁</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Homemade Chocolates for Rakshabandhan
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Feed your brother homemade chocolates on Rakshabandhan. These 2 sweets will be ready in minutes!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Recipes</span>
                        <span className="text-sm text-blue-600">Read More →</span>
                      </div>
                    </div>
                  </div>

                  {/* Ginger-Garlic Paste Tips */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🧄</div>
                        <div className="text-2xl mb-2">🫚</div>
                        <div className="text-xl">🥄</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Ginger-Garlic Paste Storage Tips
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Ginger-garlic paste will stay fresh for weeks! Adopt these 5 easy tips for better storage.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Kitchen Tips</span>
                        <span className="text-sm text-blue-600">Read More →</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Default Category Content */}
              {slug !== 'politics' && (
                <>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-2">Latest {category.title} News</h3>
                    <p className="text-gray-600 mb-4">
                      Stay updated with the most recent developments in {category.title.toLowerCase()}.
                    </p>
                    <div className="text-sm text-gray-500">
                      Updated: {new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-2">Featured Stories</h3>
                    <p className="text-gray-600 mb-4">
                      Top stories and breaking news from the {category.title.toLowerCase()} world.
                    </p>
                    <div className="text-sm text-gray-500">
                      Featured content
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              
              {/* Amla Benefits */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🫐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Amla Benefits for Skin</h4>
                    <p className="text-sm text-gray-600">Amla is a boon for skin, you will get so many benefits by eating it daily.</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">Read More →</span>
              </div>

              {/* Friendship Day Tips */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👭</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Friendship Day 2025 Tips</h4>
                    <p className="text-sm text-gray-600">If you want to make this day special with friends, adopt these tips.</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">Read More →</span>
              </div>

              {/* Eye Health Foods */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🥕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Foods for Eye Health</h4>
                    <p className="text-sm text-gray-600">These foods are beneficial for eye health, your spectacle number will start to decrease.</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">Read More →</span>
              </div>


            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a 
            href="/en" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 