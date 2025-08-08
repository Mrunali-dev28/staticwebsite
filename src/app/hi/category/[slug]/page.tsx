import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Define category information in Hindi
  const categories = {
    politics: {
      title: 'राजनीति',
      description: 'दुनिया भर से ताज़ा राजनीतिक समाचार, सरकारी अपडेट और नीति विकास',
      color: 'bg-red-100 border-red-300'
    },
    sports: {
      title: 'खेल',
      description: 'ताज़ा खेल समाचार, मैच परिणाम, खिलाड़ी अपडेट और सभी खेलों में एथलेटिक उपलब्धियां',
      color: 'bg-green-100 border-green-300'
    },
    entertainment: {
      title: 'मनोरंजन',
      description: 'सेलिब्रिटी समाचार, फिल्म रिलीज़, संगीत अपडेट और मनोरंजन उद्योग की जानकारी',
      color: 'bg-purple-100 border-purple-300'
    },
    technology: {
      title: 'तकनीक',
      description: 'नवीनतम तकनीकी नवाचार, गैजेट समीक्षा, सॉफ्टवेयर अपडेट और डिजिटल परिवर्तन समाचार',
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
                📰 ताज़ा समाचार
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-80 text-gray-700">
                🔥 ताज़ा अपडेट
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-80 text-gray-700">
                📊 विशेषज्ञ विश्लेषण
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
                        रक्षाबंधन को चॉकलेटी बना देंगी ये Homemade चॉकलेट रेसिपीज
                      </h3>
                      <p className="text-gray-600 mb-4">
                        इस राखी पर करें ट्राई, मिनटों में तैयार होंगी ये मिठाइयां!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">लाइफस्टाइल</span>
                        <span className="text-sm text-blue-600">और पढ़ें →</span>
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
                        आंखों के नीचे आ गए हैं डार्क सर्कल?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        इन घरेलू उपायों से मिल सकती है मदद, तुरंत दिखेगा फर्क!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">ब्यूटी</span>
                        <span className="text-sm text-blue-600">और पढ़ें →</span>
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
                        रक्षाबंधन पर भाई को खिलाएं Homemade चॉकलेट्स
                      </h3>
                      <p className="text-gray-600 mb-4">
                        मिनटों में तैयार होंगी ये 2 मिठाइयां, भाई को बहुत पसंद आएंगी!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">रेसिपी</span>
                        <span className="text-sm text-blue-600">और पढ़ें →</span>
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
                        हफ्तों तक ताजा रहेगा अदरक-लहसुन का पेस्ट!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        अपनाएं ये 5 आसान टिप्स, किचन में हमेशा तैयार रहेगा!
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">किचन टिप्स</span>
                        <span className="text-sm text-blue-600">और पढ़ें →</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Default Category Content */}
              {slug !== 'politics' && (
                <>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-2">ताज़ा {category.title} समाचार</h3>
                    <p className="text-gray-600 mb-4">
                      {category.title} में नवीनतम विकास के साथ अपडेट रहें।
                    </p>
                    <div className="text-sm text-gray-500">
                      अपडेट: {new Date().toLocaleDateString('hi-IN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-2">विशेष कहानियां</h3>
                    <p className="text-gray-600 mb-4">
                      {category.title} की दुनिया से शीर्ष कहानियां और ताज़ा समाचार।
                    </p>
                    <div className="text-sm text-gray-500">
                      विशेष सामग्री
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
                    <h4 className="font-semibold text-gray-800">स्किन के लिए वरदान है आंवला</h4>
                    <p className="text-sm text-gray-600">रोज खाने पर मिलेंगे इतने लाभ, त्वचा रहेगी चमकदार!</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">और पढ़ें →</span>
              </div>

              {/* Friendship Day Tips */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👭</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Friendship Day 2025 टिप्स</h4>
                    <p className="text-sm text-gray-600">दोस्तों के साथ ये दिन बनाना चाहते हैं खास तो अपनाएं ये टिप्स</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">और पढ़ें →</span>
              </div>

              {/* Eye Health Foods */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🥕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">आंखों की हेल्थ के लिए ये फूड्स</h4>
                    <p className="text-sm text-gray-600">कम होने लगेगा चश्मे का नंबर, आंखें रहेंगी स्वस्थ!</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">और पढ़ें →</span>
              </div>

              {/* Advertisement */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold mb-2">WhatsApp पर खबरें पाएं</h4>
                  <p className="text-sm mb-3">देश-विदेश की सभी बड़ी खबरें अब आपके WhatsApp पर भी!</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium">
                    सब्सक्राइब करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a 
            href="/hi" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← होम पर वापस जाएं
          </a>
        </div>
      </div>
    </div>
  );
} 