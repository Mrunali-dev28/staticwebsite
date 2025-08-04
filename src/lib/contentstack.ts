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
}

export interface SidebarNews {
  uid: string;
  title: string;
  file?: {
    url: string;
    filename: string;
  };
  descrption?: string;
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
}

export interface Contact {
  uid: string;
  title: string;
  single_line?: string;
  number?: number;
  rich_text_editor?: string;
}

export interface Trending {
  uid: string;
  title: string;
  modular_blocks?: Array<{
    link?: {
      title: string;
      href: string;
      _metadata?: {
        uid: string;
      };
    };
  }>;
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

export default Stack; 