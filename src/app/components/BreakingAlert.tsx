import React from 'react';
import { BreakingAlert } from '@/lib/contentstack';

interface BreakingAlertProps {
  breakingAlerts: BreakingAlert[];
  currentLanguage?: string;
  locale?: 'en' | 'hi';
}

export default function BreakingAlertComponent({ breakingAlerts, currentLanguage = 'English', locale = 'en' }: BreakingAlertProps) {
  if (!breakingAlerts || breakingAlerts.length === 0) {
    return null;
  }

  // Determine the monsoon news URL based on language
  const getMonsoonNewsUrl = () => {
    return currentLanguage === 'Hindi' ? '/hi/monsoon-news' : '/en/monsoon-news';
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 mb-6 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <h3 className="font-bold text-lg">{locale === 'hi' ? 'तोड़फोड़ समाचार' : 'Breaking News'}</h3>
              <div className="text-red-100 text-sm">
                {breakingAlerts.length} {locale === 'hi' ? 'अलर्ट' : 'alert'}{breakingAlerts.length !== 1 ? (locale === 'hi' ? 'सक्रिय' : 's') : ''} {locale === 'hi' ? 'सक्रिय' : 'active'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              LIVE
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {breakingAlerts.map((alert) => (
            <div key={alert.uid} className="bg-red-500 bg-opacity-30 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{alert.title}</h4>
                  {alert.rich_text_editor && (
                    <div className="text-red-100 text-sm mb-2">
                      {alert.rich_text_editor.replace(/<p>/g, '').replace(/<\/p>/g, '')}
                    </div>
                  )}
                  {alert.link && alert.link.url ? (
                    <a 
                      href={alert.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-200 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                    >
                      {locale === 'hi' ? 'और पढ़ें →' : 'Read More →'}
                    </a>
                  ) : alert.title.toLowerCase().includes('monsoon') || 
                       alert.title.toLowerCase().includes('flood') || 
                       alert.title.toLowerCase().includes('बाढ़') || 
                       alert.title.toLowerCase().includes('मानसून') || 
                       alert.title.toLowerCase().includes('rain') || 
                       alert.title.toLowerCase().includes('बारिश') ? (
                    <a 
                      href={getMonsoonNewsUrl()}
                      className="inline-flex items-center text-red-200 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                    >
                      {locale === 'hi' ? 'और पढ़ें →' : 'Read More →'}
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-red-200 text-sm font-medium opacity-50">
                      {locale === 'hi' ? 'कोई लिंक उपलब्ध नहीं' : 'No link available'}
                    </span>
                  )}
                </div>
                {alert.boolean && (
                  <span className="bg-green-500 px-2 py-1 rounded text-xs font-bold ml-2">
                    {locale === 'hi' ? 'सत्यापित' : 'VERIFIED'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 