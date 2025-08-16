'use client';

import { useEffect } from 'react';
import { getWelcomeContent, getNewsletterContent, getRecommendationsContent, getBreakingNewsContent } from '../lib/pathfora-content';

// TypeScript interface for Pathfora
declare global {
  interface Window {
    pathfora: {
      Message: any;
      initializeWidgets: (modules: any) => void;
    };
  }
}

interface LyticsPathforaProps {
  enabled?: boolean;
  locale?: 'en' | 'hi';
  config?: {
    anonymousMessage?: boolean;
    leadCapture?: boolean;
    contentRecommendations?: boolean;
  };
}

// Helper function to check if popup has been shown for a specific language
const hasPopupBeenShown = (popupType: string, locale: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const key = `lytics_popup_${popupType}_${locale}`;
  return localStorage.getItem(key) === 'true';
};

// Helper function to mark popup as shown for a specific language
const markPopupAsShown = (popupType: string, locale: string): void => {
  if (typeof window === 'undefined') return;
  
  const key = `lytics_popup_${popupType}_${locale}`;
  localStorage.setItem(key, 'true');
};

export default function LyticsPathfora({ 
  enabled = true, 
  locale = 'en',
  config = {
    anonymousMessage: true,
    leadCapture: true,
    contentRecommendations: true
  }
}: LyticsPathforaProps) {
  
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.jstag) {
      return;
    }

    // Send locale information to Lytics for personalization
    if (window.jstag && window.jstag.send) {
      window.jstag.send('user_locale', {
        locale: locale,
        language: locale === 'hi' ? 'hindi' : 'english',
        path: typeof window !== 'undefined' ? window.location.pathname : ''
      });
    }

    // Wait for Pathfora to be loaded
    window.jstag.on('pathfora.publish.done', function(topic: string, event: any) {
      console.log('🎯 Pathfora loaded, initializing personalized experiences...');
      console.log('🌐 Current locale:', locale);
      
      // Note: To show Hindi content, create Pathfora campaigns in Lytics dashboard
      // targeting users with locale='hi' or language='hindi'
      // The content will be served dynamically based on user preferences
      
      const modules: any = {
        target: []
      };

      // 1. Anonymous Visitor Welcome Message - Show only once per language
      if (config.anonymousMessage && !hasPopupBeenShown('welcome', locale)) {
        const welcomeContent = getWelcomeContent(locale);
        const welcomeModule = new window.pathfora.Message({
          id: `news-welcome-message-${locale}`,
          layout: 'slideout',
          position: 'bottom-left',
          theme: 'dark',
          headline: welcomeContent.headline,
          msg: welcomeContent.message,
          showImage: false, // Disable image to avoid 404 errors
          // Ensure proper closing
          closeOnEscape: true,
          closeOnOverlayClick: true,
          // Use buttons array for proper button configuration
          buttons: [
            {
              text: welcomeContent.confirmButton,
              action: 'confirm'
            },
            {
              text: welcomeContent.cancelButton,
              action: 'cancel'
            }
          ]
        });

        modules.target.push({
          segment: "anonymous_profiles",
          widgets: [welcomeModule]
        });

        // Mark welcome popup as shown for this language
        markPopupAsShown('welcome', locale);
      }

      // 2. Lead Capture for Newsletter Subscription - Show only once per language
      if (config.leadCapture && !hasPopupBeenShown('newsletter', locale)) {
        const newsletterContent = getNewsletterContent(locale);
        const leadCaptureModule = new window.pathfora.Message({
          id: `newsletter-signup-${locale}`,
          layout: 'modal',
          position: 'center',
          theme: 'light',
          headline: newsletterContent.headline,
          msg: newsletterContent.message,
          showImage: false, // Disable image to avoid 404 errors
          // Ensure proper closing
          closeOnEscape: true,
          closeOnOverlayClick: true,
          // Use buttons array for proper button configuration
          buttons: [
            {
              text: newsletterContent.confirmButton,
              action: 'confirm'
            },
            {
              text: newsletterContent.cancelButton,
              action: 'cancel'
            }
          ],
          confirmAction: {
            method: 'POST',
            endpoint: '/api/subscribe-newsletter',
            data: {
              source: 'pathfora_modal'
            }
          }
        });

        modules.target.push({
          segment: "anonymous_profiles",
          widgets: [leadCaptureModule]
        });

        // Mark newsletter popup as shown for this language
        markPopupAsShown('newsletter', locale);
      }

      // 3. Content Recommendations - Show only once per language
      if (config.contentRecommendations && !hasPopupBeenShown('recommendations', locale)) {
        const recommendationsContent = getRecommendationsContent(locale);
        const recommendationModule = new window.pathfora.Message({
          id: `content-recommendations-${locale}`,
          layout: 'bar',
          position: 'top',
          theme: 'dark',
          headline: recommendationsContent.headline,
          msg: recommendationsContent.message,
          showImage: false, // Disable image to avoid 404 errors
          // Ensure proper closing
          closeOnEscape: true,
          closeOnOverlayClick: true,
          // Use buttons array for proper button configuration
          buttons: [
            {
              text: recommendationsContent.confirmButton,
              action: 'confirm'
            },
            {
              text: recommendationsContent.cancelButton,
              action: 'cancel'
            }
          ]
        });

        modules.target.push({
          segment: "known_profiles",
          widgets: [recommendationModule]
        });

        // Mark recommendations popup as shown for this language
        markPopupAsShown('recommendations', locale);
      }

      // Initialize all widgets
      if (modules.target.length > 0) {
        window.pathfora.initializeWidgets(modules);
        console.log('✅ Pathfora experiences initialized:', modules.target.length, 'targets');
        console.log(`🎯 Popups shown for ${locale}:`, {
          welcome: hasPopupBeenShown('welcome', locale),
          newsletter: hasPopupBeenShown('newsletter', locale),
          recommendations: hasPopupBeenShown('recommendations', locale)
        });
      } else {
        console.log(`ℹ️ No new popups to show for ${locale} - all have been shown before`);
      }
    });

    // Track Pathfora events with better error handling
    window.jstag.on('pathfora.widget.opened', function(topic: string, event: any) {
      console.log('🎯 Pathfora widget opened:', event);
      // Track widget opens in Lytics
      if (window.jstag && window.jstag.send) {
        window.jstag.send('pathfora_widget_opened', {
          widget_id: event.id,
          widget_type: event.type,
          segment: event.segment,
          locale: locale
        });
      }
    });

    window.jstag.on('pathfora.widget.closed', function(topic: string, event: any) {
      console.log('🎯 Pathfora widget closed:', event);
      // Track widget closes in Lytics
      if (window.jstag && window.jstag.send) {
        window.jstag.send('pathfora_widget_closed', {
          widget_id: event.id,
          widget_type: event.type,
          segment: event.segment,
          locale: locale
        });
      }
    });

    window.jstag.on('pathfora.widget.action', function(topic: string, event: any) {
      console.log('🎯 Pathfora widget action:', event);
      // Track widget actions in Lytics
      if (window.jstag && window.jstag.send) {
        window.jstag.send('pathfora_widget_action', {
          widget_id: event.id,
          widget_type: event.type,
          action: event.action,
          segment: event.segment,
          locale: locale
        });
      }
    });

    // Add error handling for Pathfora
    window.jstag.on('pathfora.error', function(topic: string, error: any) {
      console.error('❌ Pathfora error:', error);
    });

  }, [enabled, config, locale]);

  return null; // This component doesn't render anything visible
}

// Helper functions for manual Pathfora control
export const pathforaHelpers = {
  // Show a custom message
  showMessage: (config: {
    id: string;
    headline: string;
    message: string;
    layout?: 'modal' | 'slideout' | 'bar';
    position?: 'top' | 'bottom' | 'center' | 'bottom-left' | 'bottom-right';
    theme?: 'light' | 'dark';
    okMessage?: string;
    cancelMessage?: string;
  }) => {
    if (typeof window !== 'undefined' && window.pathfora) {
      const pathforaModule = new window.pathfora.Message({
        id: config.id,
        layout: config.layout || 'modal',
        position: config.position || 'center',
        theme: config.theme || 'light',
        headline: config.headline,
        msg: config.message,
        showImage: false, // Disable image to avoid 404 errors
        // Ensure proper closing
        closeOnEscape: true,
        closeOnOverlayClick: true,
        // Use buttons array for proper button configuration
        buttons: [
          {
            text: config.okMessage || 'OK',
            action: 'confirm'
          },
          {
            text: config.cancelMessage || 'Cancel',
            action: 'cancel'
          }
        ]
      });

      const modules = {
        target: [{
          segment: "all",
          widgets: [pathforaModule]
        }]
      };

      window.pathfora.initializeWidgets(modules);
    }
  },

  // Show breaking news alert
  showBreakingNews: (headline: string, message: string, locale: 'en' | 'hi' = 'en') => {
    const breakingNewsContent = getBreakingNewsContent(locale);
    pathforaHelpers.showMessage({
      id: 'breaking-news-alert',
      headline: `🚨 ${headline}`,
      message: message,
      layout: 'bar',
      position: 'top',
      theme: 'dark',
      okMessage: breakingNewsContent.confirmButton,
      cancelMessage: breakingNewsContent.cancelButton
    });
  },

  // Show newsletter signup
  showNewsletterSignup: (locale: 'en' | 'hi' = 'en') => {
    const newsletterContent = getNewsletterContent(locale);
    pathforaHelpers.showMessage({
      id: 'newsletter-signup-manual',
      headline: `📧 ${newsletterContent.headline}`,
      message: newsletterContent.message,
      layout: 'modal',
      position: 'center',
      theme: 'light',
      okMessage: newsletterContent.confirmButton,
      cancelMessage: newsletterContent.cancelButton
    });
  },

  // Show content recommendation
  showRecommendation: (title: string, description: string, locale: 'en' | 'hi' = 'en') => {
    const recommendationsContent = getRecommendationsContent(locale);
    pathforaHelpers.showMessage({
      id: 'content-recommendation',
      headline: `📰 ${title}`,
      message: description,
      layout: 'slideout',
      position: 'bottom-right',
      theme: 'dark',
      okMessage: recommendationsContent.confirmButton,
      cancelMessage: recommendationsContent.cancelButton
    });
  },

  // Reset popup state for testing (useful for development)
  resetPopupState: (locale?: 'en' | 'hi') => {
    if (typeof window === 'undefined') return;
    
    if (locale) {
      // Reset for specific language
      localStorage.removeItem(`lytics_popup_welcome_${locale}`);
      localStorage.removeItem(`lytics_popup_newsletter_${locale}`);
      localStorage.removeItem(`lytics_popup_recommendations_${locale}`);
      console.log(`🔄 Reset popup state for ${locale}`);
    } else {
      // Reset for all languages
      localStorage.removeItem('lytics_popup_welcome_en');
      localStorage.removeItem('lytics_popup_newsletter_en');
      localStorage.removeItem('lytics_popup_recommendations_en');
      localStorage.removeItem('lytics_popup_welcome_hi');
      localStorage.removeItem('lytics_popup_newsletter_hi');
      localStorage.removeItem('lytics_popup_recommendations_hi');
      console.log('🔄 Reset popup state for all languages');
    }
  },

  // Check popup state for debugging
  getPopupState: () => {
    if (typeof window === 'undefined') return {};
    
    return {
      en: {
        welcome: hasPopupBeenShown('welcome', 'en'),
        newsletter: hasPopupBeenShown('newsletter', 'en'),
        recommendations: hasPopupBeenShown('recommendations', 'en')
      },
      hi: {
        welcome: hasPopupBeenShown('welcome', 'hi'),
        newsletter: hasPopupBeenShown('newsletter', 'hi'),
        recommendations: hasPopupBeenShown('recommendations', 'hi')
      }
    };
  }
}; 