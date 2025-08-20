# Lytics SDK Integration

## Overview
The Lytics SDK has been successfully integrated into your Next.js news website. This integration provides comprehensive tracking capabilities for user interactions, page views, and custom events, plus **personalized messaging experiences** using Lytics Pathfora.

## What's Been Added

### 1. Lytics Script in Layout
The Lytics tracking script has been added to `src/app/layout.tsx` in the `<head>` section. This ensures the script loads on every page of your website.

### 2. LyticsTracker Component
A new component `src/components/LyticsTracker.tsx` has been created that:
- Automatically tracks page views when routes change
- Provides helper functions for custom event tracking
- Handles user identification
- Is wrapped in Suspense for proper Next.js integration

### 3. LyticsPathfora Component (NEW!)
A new component `src/components/LyticsPathfora.tsx` has been created that:
- **Personalized messaging experiences** using Pathfora
- **Anonymous visitor welcome messages**
- **Lead capture modals** for newsletter signup
- **Content recommendation widgets**
- **Breaking news alerts**
- **Custom message triggers**

### 4. Enhanced Components
The following components have been updated with Lytics tracking:

#### NewsChannel Component
- Tracks when news channel entries are viewed
- Tracks individual news item clicks
- Sends news_id, news_title, and category information

#### EmailSubscription Component
- Tracks email subscription attempts
- Tracks successful subscriptions
- Tracks failed subscription attempts with error details

## Available Tracking Functions

### Basic Event Tracking
```typescript
import { lyticsHelpers } from '@/components/LyticsTracker';

// Track any custom event
lyticsHelpers.trackEvent('custom_event', {
  custom_data: 'value',
  timestamp: new Date().toISOString()
});
```

### News-Specific Tracking
```typescript
// Track news view
lyticsHelpers.trackNewsView('news_id', 'News Title', 'category');

// Track news click
lyticsHelpers.trackNewsClick('news_id', 'News Title', 'category');
```

### Category Tracking
```typescript
// Track category view
lyticsHelpers.trackCategoryView('sports');
```

### Language Switch Tracking
```typescript
// Track language changes
lyticsHelpers.trackLanguageSwitch('en', 'hi');
```

### Email Subscription Tracking
```typescript
// Track email subscription
lyticsHelpers.trackEmailSubscription('user@example.com', 'newsletter_form');
```

## 🎯 NEW: Pathfora Personalized Messaging

### Available Pathfora Experiences

#### 1. Anonymous Visitor Welcome Message
- **Target**: New visitors (anonymous_profiles)
- **Layout**: Slideout (bottom-left)
- **Content**: Welcome message with site branding
- **Purpose**: Introduce your news site to new visitors

#### 2. Newsletter Signup Modal
- **Target**: Anonymous visitors
- **Layout**: Modal (center)
- **Content**: Newsletter subscription form
- **Purpose**: Capture email addresses for marketing

#### 3. Content Recommendations
- **Target**: Known users (known_profiles)
- **Layout**: Bar (top)
- **Content**: Personalized content suggestions
- **Purpose**: Increase engagement with relevant content

#### 4. Breaking News Alerts
- **Target**: All users
- **Layout**: Bar (top)
- **Content**: Urgent news notifications
- **Purpose**: Drive immediate engagement

### Manual Pathfora Triggers
```typescript
import { pathforaHelpers } from '@/components/LyticsPathfora';

// Show breaking news alert
pathforaHelpers.showBreakingNews('Breaking News', 'Major development in latest story!');

// Show newsletter signup
pathforaHelpers.showNewsletterSignup();

// Show content recommendation
pathforaHelpers.showRecommendation('Recommended Story', 'Based on your interests...');

// Show custom message
pathforaHelpers.showMessage({
  id: 'custom-offer',
  headline: 'Special Offer!',
  message: 'Get 20% off premium content.',
  layout: 'modal',
  position: 'center',
  theme: 'light'
});
```

### Pathfora Event Tracking
All Pathfora interactions are automatically tracked:
- **Widget opens**: `pathfora_widget_opened`
- **Widget closes**: `pathfora_widget_closed`
- **Widget actions**: `pathfora_widget_action`

## Global Tracking Functions
You can also access tracking functions globally through `window.lyticsTracker`:

```javascript
// In browser console or client-side code
window.lyticsTracker.trackEvent('user_action', {
  action: 'button_click',
  button_name: 'subscribe'
});
```

## Events Being Tracked

### Automatic Events
- **Page Views**: Automatically tracked on every route change
- **User Identification**: When userId is provided to LyticsTracker component
- **Pathfora Interactions**: Widget opens, closes, and actions

### Manual Events
- **News Channel View**: When news channel entries are loaded
- **News Item View**: When individual news items are displayed
- **News Item Click**: When users click on news items
- **Email Subscription Attempt**: When users try to subscribe
- **Email Subscription Success**: When subscription is successful
- **Email Subscription Error**: When subscription fails

## Data Being Sent

Each event includes:
- **Event name**: Descriptive name of the action
- **Timestamp**: ISO string of when the event occurred
- **Page URL**: Current page path
- **Locale**: Current language (en/hi)
- **Event-specific data**: Relevant information for each event type

### Example Event Data
```json
{
  "event": "news_click",
  "data": {
    "news_id": "blt0171967259c79e5c",
    "news_title": "Heavy Rain Hits Delhi: Alerts Issued",
    "category": "news_channel",
    "page": "/en",
    "timestamp": "2025-01-08T10:30:00.000Z"
  }
}
```

## Configuration

The Lytics configuration is set in the layout file with:
- **Source URL**: `https://c.lytics.io/api/tag/${lyticsTagId}/latest.min.js`
- **Automatic Page Views**: Enabled
- **Pathfora Integration**: Enabled
- **Error Handling**: Built-in fallbacks

## Testing

To test the integration:

1. **Check Browser Console**: Look for Lytics-related console messages
2. **Network Tab**: Verify requests are being sent to Lytics
3. **Lytics Dashboard**: Check your Lytics dashboard for incoming events
4. **Pathfora Triggers**: Use the test buttons on the homepage to trigger experiences

## Adding More Tracking

To add tracking to new components:

1. Import the helper functions:
```typescript
import { lyticsHelpers } from '@/components/LyticsTracker';
```

2. Call tracking functions in event handlers:
```typescript
const handleButtonClick = () => {
  lyticsHelpers.trackEvent('button_click', {
    button_name: 'subscribe',
    page: window.location.pathname
  });
  // ... rest of your logic
};
```

## Adding More Pathfora Experiences

To add new personalized experiences:

1. Import the Pathfora helpers:
```typescript
import { pathforaHelpers } from '@/components/LyticsPathfora';
```

2. Create custom experiences:
```typescript
const showCustomExperience = () => {
  pathforaHelpers.showMessage({
    id: 'custom-experience',
    headline: 'Your Custom Headline',
    message: 'Your custom message',
    layout: 'modal',
    position: 'center',
    theme: 'light'
  });
};
```

## Troubleshooting

### Common Issues
1. **Script not loading**: Check if the script is present in the page source
2. **Events not firing**: Verify the component is client-side and window.jstag exists
3. **Build errors**: Ensure all imports are correct and TypeScript types are satisfied
4. **Pathfora not showing**: Check if Lytics tag ID is correct and Pathfora is enabled

### Debug Mode
You can enable debug logging by checking the browser console for Lytics-related messages.

## Performance Considerations

- The Lytics script is loaded asynchronously to not block page rendering
- Tracking functions include null checks to prevent errors
- The LyticsTracker component is wrapped in Suspense for optimal performance
- Pathfora experiences are loaded on-demand to minimize impact

## Next Steps

1. **Monitor Events**: Check your Lytics dashboard to see incoming events
2. **Custom Events**: Add more specific tracking based on your business needs
3. **User Identification**: Implement user identification when users log in
4. **A/B Testing**: Use Lytics for A/B testing different content or layouts
5. **Advanced Pathfora**: Create more sophisticated personalized experiences
6. **Content Recommendations**: Implement AI-powered content suggestions 