// Pathfora Content Configuration
// This file manages localized content for Pathfora popups using environment variables

export interface PathforaContent {
  welcome: {
    headline: string;
    message: string;
    confirmButton: string;
    cancelButton: string;
  };
  newsletter: {
    headline: string;
    message: string;
    confirmButton: string;
    cancelButton: string;
  };
  recommendations: {
    headline: string;
    message: string;
    confirmButton: string;
    cancelButton: string;
  };
  breakingNews: {
    confirmButton: string;
    cancelButton: string;
  };
}

// English content (default)
const englishContent: PathforaContent = {
  welcome: {
    headline: 'Welcome to My Channel Sabse Tej!',
    message: 'Stay updated with the latest breaking news and updates from your trusted news source.',
    confirmButton: 'Get Started',
    cancelButton: 'Maybe Later'
  },
  newsletter: {
    headline: 'Stay Updated with Breaking News!',
    message: 'Get the latest news and updates delivered directly to your inbox.',
    confirmButton: 'Subscribe Now',
    cancelButton: 'Not Now'
  },
  recommendations: {
    headline: 'Recommended for You',
    message: 'Based on your interests, you might like these stories:',
    confirmButton: 'Show Me',
    cancelButton: 'Dismiss'
  },
  breakingNews: {
    confirmButton: 'Read More',
    cancelButton: 'Dismiss'
  }
};

// Hindi content
const hindiContent: PathforaContent = {
  welcome: {
    headline: 'मेरे चैनल सबसे तेज में आपका स्वागत है!',
    message: 'अपने विश्वसनीय समाचार स्रोत से ताज़ा ब्रेकिंग न्यूज़ और अपडेट प्राप्त करें।',
    confirmButton: 'शुरू करें',
    cancelButton: 'बाद में'
  },
  newsletter: {
    headline: 'ब्रेकिंग न्यूज़ के साथ अपडेट रहें!',
    message: 'ताज़ा समाचार और अपडेट सीधे आपके इनबॉक्स में प्राप्त करें।',
    confirmButton: 'अभी सब्सक्राइब करें',
    cancelButton: 'अभी नहीं'
  },
  recommendations: {
    headline: 'आपके लिए अनुशंसित',
    message: 'आपकी रुचियों के आधार पर, आपको ये कहानियां पसंद आ सकती हैं:',
    confirmButton: 'दिखाएं',
    cancelButton: 'खारिज करें'
  },
  breakingNews: {
    confirmButton: 'और पढ़ें',
    cancelButton: 'खारिज करें'
  }
};

// Function to get content based on locale
export function getPathforaContent(locale: 'en' | 'hi'): PathforaContent {
  return locale === 'hi' ? hindiContent : englishContent;
}

// Function to get specific content section
export function getWelcomeContent(locale: 'en' | 'hi') {
  return getPathforaContent(locale).welcome;
}

export function getNewsletterContent(locale: 'en' | 'hi') {
  return getPathforaContent(locale).newsletter;
}

export function getRecommendationsContent(locale: 'en' | 'hi') {
  return getPathforaContent(locale).recommendations;
}

export function getBreakingNewsContent(locale: 'en' | 'hi') {
  return getPathforaContent(locale).breakingNews;
} 