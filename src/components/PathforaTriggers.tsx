'use client';

import React from 'react';
import { pathforaHelpers } from './LyticsPathfora';

interface PathforaTriggersProps {
  show?: boolean;
  locale?: 'en' | 'hi';
}

export default function PathforaTriggers({ show = false, locale = 'en' }: PathforaTriggersProps) {
  if (!show) return null;

  const handleBreakingNews = () => {
    pathforaHelpers.showBreakingNews(
      locale === 'hi' ? 'ब्रेकिंग न्यूज़ अलर्ट' : 'Breaking News Alert',
      locale === 'hi' ? 'नवीनतम कहानी में बड़ा विकास। और पढ़ने के लिए क्लिक करें!' : 'Major development in the latest story. Click to read more!',
      locale
    );
  };

  const handleNewsletterSignup = () => {
    pathforaHelpers.showNewsletterSignup(locale);
  };

  const handleContentRecommendation = () => {
    pathforaHelpers.showRecommendation(
      locale === 'hi' ? 'आपके लिए अनुशंसित' : 'Recommended for You',
      locale === 'hi' ? 'आपके पढ़ने के इतिहास के आधार पर, आपको तकनीकी रुझानों के बारे में यह कहानी पसंद आ सकती है।' : 'Based on your reading history, you might like this story about technology trends.',
      locale
    );
  };

  const handleCustomMessage = () => {
    pathforaHelpers.showMessage({
      id: 'custom-message',
      headline: locale === 'hi' ? 'विशेष प्रस्ताव!' : 'Special Offer!',
      message: locale === 'hi' ? 'प्रीमियम सामग्री सदस्यता पर 20% की छूट प्राप्त करें।' : 'Get 20% off on premium content subscription.',
      layout: 'modal',
      position: 'center',
      theme: 'light',
      okMessage: locale === 'hi' ? 'ऑफर प्राप्त करें' : 'Get Offer',
      cancelMessage: locale === 'hi' ? 'बाद में' : 'Maybe Later'
    });
  };

  const handleResetPopupState = () => {
    pathforaHelpers.resetPopupState(locale);
    alert(locale === 'hi' ? 'पॉपअप स्थिति रीसेट हो गई है!' : 'Popup state has been reset!');
  };

  const handleCheckPopupState = () => {
    const state = pathforaHelpers.getPopupState();
    console.log('Current popup state:', state);
    alert(locale === 'hi' 
      ? `पॉपअप स्थिति: ${JSON.stringify(state, null, 2)}` 
      : `Popup state: ${JSON.stringify(state, null, 2)}`
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="text-sm font-bold text-gray-800 mb-3">
        {locale === 'hi' ? '🎯 अलर्ट्स' : '🎯 Alerts'}
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={handleBreakingNews}
          className="w-full text-xs bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
        >
          {locale === 'hi' ? '🚨 ब्रेकिंग न्यूज़' : '🚨 Breaking News'}
        </button>
        
        <button
          onClick={handleNewsletterSignup}
          className="w-full text-xs bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {locale === 'hi' ? '📧 न्यूज़लेटर साइनअप' : '📧 Newsletter Signup'}
        </button>
        
        <button
          onClick={handleContentRecommendation}
          className="w-full text-xs bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
        >
          {locale === 'hi' ? '📰 सामग्री सिफारिश' : '📰 Content Recommendation'}
        </button>
        
        <button
          onClick={handleCustomMessage}
          className="w-full text-xs bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          {locale === 'hi' ? '💬 कस्टम अलर्ट' : '💬 Custom Alert'}
        </button>

        {/* Development/Testing buttons */}
        <div className="border-t pt-2 mt-3">
          <button
            onClick={handleResetPopupState}
            className="w-full text-xs bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            {locale === 'hi' ? '🔄 पॉपअप रीसेट' : '🔄 Reset Popups'}
          </button>
          
          <button
            onClick={handleCheckPopupState}
            className="w-full text-xs bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 transition-colors mt-1"
          >
            {locale === 'hi' ? '📊 स्थिति देखें' : '📊 Check State'}
          </button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        {locale === 'hi' 
          ? 'ये बटन पथफोरा अनुभवों को ट्रिगर करते हैं' 
          : 'These buttons trigger Pathfora experiences'
        }
      </p>
    </div>
  );
} 