# Contentstack Setup Guide

## Overview
This Channel 24 News website is built with Next.js and integrates with Contentstack CMS using the schema you provided.

## Schema Implementation
The website implements your complete "News Channel" content type schema:

### Fields Implemented:
- **Title** (text, mandatory, unique)
- **URL** (text)
- **Date** (isodate)
- **Boolean** (boolean)
- **Number** (number)  
- **Link** (link with title and url)
- **File** (file with url, title, filename)
- **Reference** (reference to "kasjmir_news")
- **Modular Blocks** (blocks with "Category Block" and "Image Block")
- **Taxonomy** (taxonomy with "live_weather")

## Environment Setup

Create a `.env.local` file in the `static-website` directory with your Contentstack credentials:

```env
# Contentstack Configuration
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production

# Optional: Preview Configuration
CONTENTSTACK_PREVIEW_TOKEN=your_preview_token_here
CONTENTSTACK_PREVIEW_HOST=rest-preview.contentstack.io
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Content Types in Contentstack

Make sure your Contentstack space has these content types configured:

### 1. News Channel (news_channel)
- Primary content type with the schema you provided
- UID: `news_channel`

### 2. Author (author)
- Referenced content type for news correspondents
- Fields: name, role, department, experience_years

### 3. Category (category)  
- News category content type
- Fields: title, description, color, icon, article_count

### 4. Kasjmir News (kasjmir_news)
- Referenced news items content type
- Fields: title, description, content, category, published_date, author, featured_image

### 5. Live Weather (live_weather)
- Taxonomy for weather-related content

## Features

### 🎯 Content Features
- ✅ News Channel Schema Integration
- ✅ Modular Blocks Support
- ✅ Taxonomy Categories  
- ✅ Referenced Content Types
- ✅ Real-time Content Updates

### 🚀 Technical Features
- ✅ Contentstack SDK Integration
- ✅ TypeScript Type Safety
- ✅ Responsive Design
- ✅ Modern UI Components
- ✅ Fallback Data for Development

### 📺 UI Components
- Breaking News Ticker
- Live Weather Bar
- Hero Section with Stats
- News Categories Grid
- Latest Stories with Authors
- Global Weather Center
- Team Profiles
- Live Viewer Counter

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

The website will automatically fetch content from Contentstack. If no content is available, it falls back to sample data for development.

### Modular Blocks
The schema supports modular blocks:
- **Category Block**: JSON RTE content
- **Image Block**: File uploads

### Taxonomy Integration
The "live_weather" taxonomy is integrated for weather-related content categorization.

## Deployment

The website is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting provider

Make sure to set your environment variables in your deployment platform.

## Support

The website includes comprehensive error handling and fallback data, so it will work even if Contentstack is temporarily unavailable. 