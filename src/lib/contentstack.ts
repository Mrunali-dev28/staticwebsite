import contentstack from '@contentstack/delivery-sdk';

// Initialize Contentstack Delivery SDK with TypeScript support
const Stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
});

// TypeScript interfaces for content types
export interface GlobalSetting {
  uid: string;
  title: string;
  file?: {
    url: string;
    filename: string;
  };
  single_line?: string;
  live?: string;
  group?: {
    boolean?: boolean;
  };
}

export interface SeoMetadata {
  uid: string;
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    url: string;
    filename: string;
  };
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: {
    url: string;
    filename: string;
  };
}

export interface NewsChannel {
  uid: string;
  title: string;
  url?: string;
  date?: string;
  number?: number;
  file?: {
    url: string;
    filename: string;
  };
  reference?: unknown[];
  hgvgh767?: boolean;
  b12jh7t7?: boolean;
  news?: SeoMetadata; // Global field for SEO metadata
}

export interface SidebarNews {
  uid: string;
  title: string;
  file?: {
    url: string;
    filename: string;
  };
  descrption?: string;
  url?: string;
  link?: {
    title: string;
    url: string;
  };
}

export interface NewsCategory {
  uid: string;
  title: string;
  url?: string;
  rich_text_editor?: string;
  file?: {
    url: string;
    filename: string;
  };
  taxonomies?: unknown[];
}

export interface NewsAuthor {
  uid: string;
  title: string;
  rich_text_editor?: string;
  file?: {
    url: string;
    filename: string;
  };
}

export interface BreakingAlert {
  uid: string;
  title: string;
  rich_text_editor?: string;
  link?: {
    title: string;
    url: string;
  };
  boolean?: boolean;
  reference?: unknown[];
}

export interface LiveUpdate {
  uid: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  publish_details?: {
    time: string;
    user: string;
    environment: string;
    locale: string;
  };
}

export interface NewUpdate {
  uid: string;
  title: string;
  description?: string;
  content?: string;
  rich_text_editor?: string;
  file?: {
    url: string;
    filename: string;
  };
  date?: string;
  created_at?: string;
  updated_at?: string;
  publish_details?: {
    time: string;
    user: string;
    environment: string;
    locale: string;
  };
}

export interface Contact {
  uid: string;
  title: string;
  single_line?: string;
  number?: number;
  rich_text_editor?: string;
}

export interface EmailSubscription {
  uid: string;
  title: string;
  single_line?: string;
  button_text?: string;
  placeholder_text?: string;
}

export interface Trending {
  uid: string;
  title: string;
  modular_blocks?: Array<{
    link?: {
      title: string;
      href: string;
      description?: string;
      _metadata?: {
        uid: string;
      };
    };
    // Add support for other modular block types
    [key: string]: any;
  }>;
  _embedded_items?: {
    [key: string]: any[];
  };
  tags?: string[];
  locale?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  _version?: number;
  _in_progress?: boolean;
}

export interface LanguageSwitchButton {
  uid: string;
  title: string;
  dropdown?: string[];
  choose_language?: Array<{
    single_line?: string;
    link?: {
      title: string;
      url: string;
    };
  }>;
}

export interface MonsoonNews {
  uid: string;
  title: string;
  description?: string;
  content?: string;
  rich_text_editor?: string;
  file?: {
    url: string;
    filename: string;
  };
  date?: string;
  location?: string;
  severity?: string;
  emergency_contacts?: Array<{
    title: string;
    number: string;
  }>;
  affected_areas?: string[];
  safety_advisory?: string;
  weather_updates?: string;
}

export interface ReadMorePage {
  uid: string;
  title: string;
  latest_updates?: string;
  emergency_contacts?: number;
  url?: string;
}

export interface GoToPolitics {
  uid: string;
  title: string;
  updates?: string;
  latest_news?: string;
  url?: string;
}

export interface NewUpdate {
  uid: string;
  title: string;
  file?: {
    url: string;
    filename: string;
  };
}

// Export the Stack for use in other files
export default Stack; 