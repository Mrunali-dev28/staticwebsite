'use client';

import React, { useState } from 'react';
import { EmailSubscription as EmailSubscriptionType } from '@/lib/contentstack';
import { lyticsHelpers } from '../../components/LyticsTracker';

interface EmailSubscriptionProps {
  emailSubscriptionData: EmailSubscriptionType | null;
  locale?: 'en' | 'hi';
}

export default function EmailSubscription({ emailSubscriptionData, locale = 'en' }: EmailSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage(locale === 'hi' ? 'कृपया अपना ईमेल पता दर्ज करें' : 'Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setMessage(locale === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      console.log('📧 Starting email subscription for:', email);
      console.log('📧 Calling Contentstack API directly...');
      
      // Track email subscription attempt
      lyticsHelpers.trackEmailSubscription(email, 'newsletter_form');
      
      // Call Contentstack automation API
      const contentstackResponse = await fetch('https://app.contentstack.com/automations-api/run/85bcaf66ce3244c88fa225fbc8ce2738', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ah-http-key': 'H9@envpjeh',
        },
        body: JSON.stringify({ 
          email: email,
          timestamp: new Date().toISOString(),
          action: 'newsletter_subscription'
        }),
      });

      console.log('📧 Contentstack API response status:', contentstackResponse.status);
      
      if (!contentstackResponse.ok) {
        const errorText = await contentstackResponse.text();
        console.error('❌ Contentstack API error:', errorText);
        throw new Error(`Contentstack API error: ${contentstackResponse.status} - ${errorText}`);
      }

      const responseText = await contentstackResponse.text();
      console.log('📧 Contentstack API response body:', responseText);

      // Track successful subscription
      lyticsHelpers.trackEvent('email_subscription_success', {
        email,
        source: 'newsletter_form',
        locale,
        page: window.location.pathname
      });

      // Success - email sent via Contentstack Automation Hub
      setMessage(locale === 'hi' ? '✅ सदस्यता सफल! अपना ईमेल जांचें।' : '✅ Subscription successful! Check your email.');
      setEmail('');
      
    } catch (error) {
      console.error('❌ Subscription error:', error);
      
      // Track failed subscription
      lyticsHelpers.trackEvent('email_subscription_error', {
        email,
        source: 'newsletter_form',
        error: error instanceof Error ? error.message : String(error),
        locale,
        page: window.location.pathname
      });
      
      setMessage(locale === 'hi' ? '❌ त्रुटि: ' + error : '❌ Error: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use CMS data or fallback with Hindi support
  const title = emailSubscriptionData?.title || (locale === 'hi' ? 'नवीनतम समाचार के साथ अपडेट रहें' : 'Stay Updated with Latest News');
  const description = emailSubscriptionData?.single_line || (locale === 'hi' ? 'तोड़फोड़ समाचार और अपडेट सीधे अपने इनबॉक्स में प्राप्त करने के लिए सदस्यता लें' : 'Subscribe to receive breaking news and updates directly in your inbox');
  const buttonText = emailSubscriptionData?.button_text || (locale === 'hi' ? '📧 समाचार की सदस्यता लें' : '📧 Subscribe to News');
  const placeholderText = emailSubscriptionData?.placeholder_text || (locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email');

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="max-w-md mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (locale === 'hi' ? '📧 सदस्यता ले रहे हैं...' : '📧 Subscribing...') : buttonText}
            </button>
          </div>
          {message && (
            <div className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 