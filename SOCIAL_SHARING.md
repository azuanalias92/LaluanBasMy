# Social Sharing Implementation

This document outlines the social sharing functionality added to LaluanBasMY to increase the page's reach on social media platforms.

## Components Added

### 1. SocialShare Component
**Location:** `src/app/components/SocialShare.tsx`

A comprehensive social sharing component that provides:
- **Facebook sharing** - Opens Facebook share dialog
- **Twitter sharing** - Opens Twitter compose dialog with pre-filled content
- **WhatsApp sharing** - Opens WhatsApp with formatted message
- **Telegram sharing** - Opens Telegram share dialog
- **Native sharing** - Uses device's native share API (mobile devices)
- **Copy link** - Copies current page URL to clipboard

### 2. SocialShareCompact Component
**Location:** `src/app/components/SocialShare.tsx`

A compact dropdown version of the social sharing component for smaller spaces.

## Implementation Details

### Features
- **Multi-language support** - Uses translation keys for all text
- **Responsive design** - Works on both desktop and mobile devices
- **Customizable content** - Accepts custom title and description props
- **Fallback handling** - Graceful degradation when APIs are unavailable
- **Visual feedback** - Shows confirmation when link is copied

### Platform-Specific Implementations

#### Facebook
- Uses Facebook's sharer API
- Opens in new window with proper security attributes
- Shares current page URL

#### Twitter
- Uses Twitter's intent API
- Pre-fills tweet with title and URL
- Opens in new window

#### WhatsApp
- Uses WhatsApp's web API
- Formats message with title, description, and URL
- Works on both mobile and desktop

#### Telegram
- Uses Telegram's share URL API
- Shares title and URL
- Opens in new window or Telegram app

#### Native Share (Mobile)
- Uses Web Share API when available
- Provides native mobile sharing experience
- Includes title, description, and URL

#### Copy Link
- Uses Clipboard API
- Shows visual feedback when successful
- Fallback error handling

## Integration Points

### Homepage Integration
**Location:** `src/app/page.tsx`

1. **Hero Section** - Full social sharing component after the subtitle
2. **CTA Section** - Compact social sharing component next to the main CTA button

### Translation Support
**Files Updated:**
- `src/app/translations/ms.json` - Malay translations
- `src/app/translations/en.json` - English translations

**Translation Keys Added:**
```json
{
  "share": {
    "button": "Share",
    "native": "Share",
    "copy": "Copy Link",
    "copied": "Copied!",
    "title": "Share this page",
    "description": "Share this bus route information with your friends"
  }
}
```

## Usage Examples

### Basic Usage
```tsx
import { SocialShare } from './components/SocialShare';

<SocialShare 
  title="Custom Title"
  description="Custom Description"
  className="justify-center"
/>
```

### Compact Version
```tsx
import { SocialShareCompact } from './components/SocialShare';

<SocialShareCompact 
  title="Custom Title"
  description="Custom Description"
/>
```

### With Translation Context
```tsx
const { t } = useLanguage();

<SocialShare 
  title={t('home.title')}
  description={t('home.subtitle')}
/>
```

## SEO Benefits

1. **Increased Social Signals** - More shares can improve search rankings
2. **Enhanced Reach** - Content spreads organically through social networks
3. **Improved Engagement** - Users can easily share interesting content
4. **Brand Awareness** - Consistent sharing increases brand visibility
5. **Traffic Generation** - Social shares drive referral traffic

## Technical Considerations

### Security
- All external links open with `noopener,noreferrer` attributes
- Proper URL encoding for all shared content
- No sensitive information exposed in share URLs

### Performance
- Client-side only implementation
- No external JavaScript dependencies
- Minimal bundle size impact
- Lazy loading of share dialogs

### Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Browser Support

- **Web Share API**: Modern mobile browsers
- **Clipboard API**: Modern browsers (HTTPS required)
- **Social Platform APIs**: All modern browsers
- **Fallback Support**: Graceful degradation for older browsers

## Future Enhancements

1. **Additional Platforms** - LinkedIn, Reddit, Pinterest
2. **Analytics Integration** - Track sharing events
3. **Custom Share Images** - Platform-specific optimized images
4. **Share Count Display** - Show social share counts
5. **QR Code Sharing** - Generate QR codes for easy mobile sharing

## Maintenance

- **Translation Updates** - Add new languages as needed
- **Platform API Changes** - Monitor for social platform API updates
- **Performance Monitoring** - Track sharing success rates
- **User Feedback** - Collect feedback on sharing experience