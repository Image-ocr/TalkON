# TalkON Logo Usage Guide

## Quick Reference

### Logo Files Location

```
assets/logo/
├── svg/                          # Vector source files
│   ├── talkon-logo-full.svg      # Full color logo (default)
│   ├── talkon-icon.svg           # Icon only
│   ├── talkon-text.svg           # Text only
│   ├── talkon-logo-dark.svg      # For dark backgrounds
│   ├── talkon-icon-dark.svg      # Icon for dark backgrounds
│   ├── talkon-monochrome-black.svg
│   └── talkon-monochrome-white.svg
└── png/                          # Raster exports
    ├── favicon/                  # Browser favicons
    ├── pwa/                      # Progressive Web App icons
    ├── ios/                      # iOS app icons
    ├── android/                  # Android app icons
    └── general/                  # General purpose PNGs
```

## Integration Points

### Web Application

#### Public Assets (`packages/web-app/public/`)

| File | Source | Purpose |
|------|--------|---------|
| `favicon.ico` | `talkon-icon.svg` | Browser tab icon |
| `favicon-16x16.png` | 16x16 PNG | Legacy favicon |
| `favicon-32x32.png` | 32x32 PNG | Standard favicon |
| `apple-touch-icon.png` | 180x180 PNG | iOS home screen |
| `icon-192.png` | 192x192 PNG | PWA icon |
| `icon-512.png` | 512x512 PNG | PWA splash screen |

#### React Components

```tsx
// Logo component - src/components/shared/Logo.tsx
import Logo from '@/components/shared/Logo';

// Usage options
<Logo variant="full" />          // Full logo with icon + text
<Logo variant="icon" />          // Icon only
<Logo variant="text" />          // Text only
<Logo variant="full" dark />     // Dark mode version
```

### Mobile Application

#### iOS (`packages/mobile-app/ios/`)

App icons are managed in `Assets.xcassets/AppIcon.appiconset/`:

| File | Size | Usage |
|------|------|-------|
| `icon-20@2x.png` | 40x40 | Notification |
| `icon-20@3x.png` | 60x60 | Notification |
| `icon-29@2x.png` | 58x58 | Settings |
| `icon-29@3x.png` | 87x87 | Settings |
| `icon-40@2x.png` | 80x80 | Spotlight |
| `icon-40@3x.png` | 120x120 | Spotlight |
| `icon-60@2x.png` | 120x120 | Home screen @2x |
| `icon-60@3x.png` | 180x180 | Home screen @3x |
| `icon-76@2x.png` | 152x152 | iPad home screen |
| `icon-83.5@2x.png` | 167x167 | iPad Pro home screen |
| `icon-1024.png` | 1024x1024 | App Store |

#### Android (`packages/mobile-app/android/`)

App icons in `app/src/main/res/mipmap-*/`:

| Directory | Size | Density |
|-----------|------|---------|
| `mipmap-mdpi/` | 48x48 | Medium |
| `mipmap-hdpi/` | 72x72 | High |
| `mipmap-xhdpi/` | 96x96 | Extra high |
| `mipmap-xxhdpi/` | 144x144 | Extra extra high |
| `mipmap-xxxhdpi/` | 192x192 | Extra extra extra high |

Each directory contains:
- `ic_launcher.png` - Standard app icon
- `ic_launcher_round.png` - Round variant

### Desktop Application

#### Electron Build (`packages/desktop-app/build/`)

| File | Format | Platform | Sizes |
|------|--------|----------|-------|
| `icon.ico` | ICO | Windows | 16-256px |
| `icon.icns` | ICNS | macOS | All required |
| `icon.png` | PNG | Linux | 512x512 |

## Usage by Context

### Authentication Screens

Use the **full logo** centered on the screen:

```tsx
// Light background
<Logo variant="full" size="large" />

// Dark background
<Logo variant="full" size="large" dark />
```

### Navigation Headers

Use the **full logo** at reduced size:

```tsx
<header>
  <Logo variant="full" size="small" />
  <nav>...</nav>
</header>
```

### App Launch/Splash Screens

Use the **icon only** version:

```tsx
<SplashScreen>
  <Logo variant="icon" size="xlarge" animated />
</SplashScreen>
```

### Loading States

Use the **icon only** with animation:

```tsx
<LoadingState>
  <Logo variant="icon" size="medium" pulse />
</LoadingState>
```

### Watermarks

Use **text only** at low opacity:

```tsx
<Watermark>
  <Logo variant="text" opacity={0.1} />
</Watermark>
```

## Implementation Examples

### React Component Props

```typescript
interface LogoProps {
  variant: 'full' | 'icon' | 'text';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  dark?: boolean;
  monochrome?: 'black' | 'white';
  animated?: boolean;
  className?: string;
}
```

### CSS Custom Properties

```css
:root {
  /* Logo sizes */
  --logo-size-small: 80px;
  --logo-size-medium: 120px;
  --logo-size-large: 200px;
  --logo-size-xlarge: 300px;
  
  /* Logo colors */
  --logo-primary: #0066FF;
  --logo-secondary: #00D4FF;
  --logo-accent: #00CC88;
  --logo-highlight: #FF9500;
}
```

## Troubleshooting

### Logo appears blurry

- Use SVG format for web
- Ensure PNG exports are at correct size (don't scale up small images)
- Check device pixel ratio (DPR) for mobile

### Colors look wrong

- Verify you're using the correct variant for the background
- Check for CSS filters or opacity affecting the logo
- Ensure color profile is sRGB

### Logo doesn't fit

- Use the appropriate variant (icon-only for small spaces)
- Adjust size prop rather than scaling with CSS
- Consider responsive sizing

## Asset Generation

To regenerate PNG assets from SVG sources:

```bash
cd assets/logo
node generate-pngs.js
```

For production, use a tool like:
- **ImageMagick**: `convert -background none input.svg output.png`
- **Inkscape**: `inkscape -w 192 -h 192 input.svg -o output.png`
- **Figma/Sketch**: Export artboards at 1x, 2x, 3x

## Support

For logo-related questions or requests:
1. Check these guidelines first
2. Review the brand-guidelines.md for comprehensive rules
3. Contact the design team for special use cases
