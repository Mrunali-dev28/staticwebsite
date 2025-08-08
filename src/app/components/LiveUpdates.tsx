import React from 'react';
import { LiveUpdate, NewsAuthor } from '@/lib/contentstack';

interface LiveUpdatesProps {
  liveUpdates: LiveUpdate[];
  authors?: NewsAuthor[];
  locale?: string;
}

// Hindi translation function
function translateToHindi(text: string, locale: string = 'en'): string {
  if (!text || locale !== 'hi') return text;
  
  const translations: Record<string, string> = {
    // Live Updates translations
    '"Story | The Illness of Poetry | StoryBox with Jamshed"': '"कहानी | कविता की बीमारी | स्टोरीबॉक्स विद जमशेद"',
    '"Massive price cut on iPhone 16 Pro, changes made ahead of iPhone 17 launch"': '"iPhone 16 Pro पर भारी कीमत में कटौती, iPhone 17 लॉन्च से पहले बदलाव"',
    "'He was on a scooty, wearing a helmet…' — What the woman MP, victim of chain snatching near Parliament, revealed": "'वह स्कूटी पर था, हेलमेट पहने हुए…' — संसद के पास चेन स्नैचिंग की शिकार महिला सांसद ने क्या खुलासा किया",
    // Additional translations to ensure all English titles are converted
    'Massive price cut on iPhone 16 Pro, changes made ahead of iPhone 17 launch': 'iPhone 16 Pro पर भारी कीमत में कटौती, iPhone 17 लॉन्च से पहले बदलाव',
    'He was on a scooty, wearing a helmet… — What the woman MP, victim of chain snatching near Parliament, revealed': 'वह स्कूटी पर था, हेलमेट पहने हुए… — संसद के पास चेन स्नैचिंग की शिकार महिला सांसद ने क्या खुलासा किया',
    
    // UI Elements translations
    'LIVE UPDATES': 'लाइव अपडेट्स',
    'Update #1': 'अपडेट #1',
    'Update #2': 'अपडेट #2', 
    'Update #3': 'अपडेट #3',
    'Just now': 'अभी अभी',
    'LATEST': 'नवीनतम',
    'updates': 'अपडेट्स',
    
    // Author translations
    'Aarav Desai': 'आरव देसाई',
  };
  
  // Check for exact match first
  if (translations[text]) {
    return translations[text];
  }
  
  // If no exact match, return original text
  return text;
}

export default function LiveUpdates({ liveUpdates, authors = [], locale = 'en' }: LiveUpdatesProps) {
  if (!liveUpdates || liveUpdates.length === 0) {
    return null;
  }

  // Helper function to get random author
  const getRandomAuthor = () => {
    if (authors.length === 0) return null;
    return authors[Math.floor(Math.random() * authors.length)];
  };

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h3 className="font-bold text-base">{translateToHindi('LIVE UPDATES', locale)}</h3>
          </div>
          <span className="text-sm bg-red-700 px-3 py-1 rounded-full">
            {liveUpdates.length} {translateToHindi('updates', locale)}
          </span>
        </div>
      </div>

      {/* Updates List - Each update as separate card */}
      <div className="space-y-4">
        {liveUpdates.map((update, index) => {
          const author = getRandomAuthor();
          return (
            <div 
              key={update.uid} 
              className={`border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
                index === 0 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Update Header */}
              <div className={`px-6 py-3 rounded-t-lg ${
                index === 0 ? 'bg-red-100' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-600">
                      {translateToHindi(`Update #${index + 1}`, locale)}
                    </span>
                    {index === 0 && (
                                              <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full">
                          {translateToHindi('LATEST', locale)}
                        </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>🕒</span>
                    <span>{translateToHindi('Just now', locale)}</span>
                  </div>
                </div>
              </div>

              {/* Update Content */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 text-base leading-tight mb-3">
                  {translateToHindi(update.title, locale)}
                </h4>
              </div>

              {/* Update Footer */}
              <div className={`px-6 py-3 rounded-b-lg text-sm text-gray-500 ${
                index === 0 ? 'bg-red-50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  {author ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👤</span>
                      <span className="font-medium text-gray-700">{translateToHindi(author.title, locale)}</span>
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 