# Lytics Popup Behavior

## Overview
The Lytics popups now show only once per language instead of on every page refresh. This provides a better user experience by avoiding repetitive popup displays.

## How It Works

### Popup Types
1. **Welcome Message** - Shown to anonymous users
2. **Newsletter Signup** - Email subscription modal
3. **Content Recommendations** - Personalized content suggestions

### Language-Specific Behavior
- **English (`/en`)** - Popups show once for English users
- **Hindi (`/hi`)** - Popups show once for Hindi users
- **Independent Tracking** - Each language has its own popup state

### Storage Mechanism
- Uses `localStorage` to track popup display state
- Keys format: `lytics_popup_{type}_{locale}`
- Examples:
  - `lytics_popup_welcome_en`
  - `lytics_popup_newsletter_hi`
  - `lytics_popup_recommendations_en`

## Testing and Development

### Reset Popup State
To test popups again, you can reset the state:

1. **Using the UI** (if PathforaTriggers is visible):
   - Click the "🔄 Reset Popups" button
   - This resets popups for the current language only

2. **Using Browser Console**:
   ```javascript
   // Reset for current language
   pathforaHelpers.resetPopupState('en'); // or 'hi'
   
   // Reset for all languages
   pathforaHelpers.resetPopupState();
   ```

3. **Manual localStorage reset**:
   ```javascript
   // Reset all popup states
   localStorage.removeItem('lytics_popup_welcome_en');
   localStorage.removeItem('lytics_popup_newsletter_en');
   localStorage.removeItem('lytics_popup_recommendations_en');
   localStorage.removeItem('lytics_popup_welcome_hi');
   localStorage.removeItem('lytics_popup_newsletter_hi');
   localStorage.removeItem('lytics_popup_recommendations_hi');
   ```

### Check Current State
To see which popups have been shown:

1. **Using the UI**:
   - Click the "📊 Check State" button
   - Shows current popup state for all languages

2. **Using Browser Console**:
   ```javascript
   console.log(pathforaHelpers.getPopupState());
   ```

## Configuration

### Enable/Disable Popups
In `layout.tsx`, you can configure which popups to show:

```typescript
<LyticsPathforaWrapper 
  enabled={true}
  config={{
    anonymousMessage: true,    // Welcome message
    leadCapture: true,         // Newsletter signup
    contentRecommendations: true // Content recommendations
  }}
/>
```

### Environment Variables
- `NEXT_PUBLIC_LYTICS_TAG_ID` - Your Lytics tag ID
- Default: `d47835afc82093e811b7b2e88bf93d68`

## User Experience

### First Visit (English)
- User visits `/en`
- Welcome popup appears
- Newsletter signup may appear
- Content recommendations may appear
- All popups are marked as "shown" for English

### First Visit (Hindi)
- User visits `/hi`
- Same popups appear but in Hindi
- All popups are marked as "shown" for Hindi

### Subsequent Visits
- No popups appear (unless manually reset)
- User can still trigger popups manually using the PathforaTriggers component

### Language Switching
- If user switches from English to Hindi (or vice versa)
- Popups will show again for the new language
- Each language maintains independent popup state

## Troubleshooting

### Popups Not Showing
1. Check if Lytics is properly loaded
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure popup state hasn't been marked as shown

### Popups Showing Too Often
1. Check if localStorage is working
2. Verify popup state is being saved correctly
3. Check for multiple instances of the component

### Testing Popups
1. Use the reset functionality
2. Clear browser localStorage
3. Use incognito/private browsing mode
4. Test on different browsers/devices

## Browser Compatibility
- Requires localStorage support
- Works in all modern browsers
- Gracefully degrades if localStorage is not available
