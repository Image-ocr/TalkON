# TalkON Brand Guidelines

## Overview

TalkON is a modern, professional messaging platform. Our brand identity reflects trust, connectivity, and seamless communication across all platforms.

---

## Logo

### Primary Logo

The TalkON logo consists of a chat bubble icon combined with the wordmark "TalkON". The "ON" in TalkON is highlighted in green to signify online/active status.

![TalkON Logo](../assets/logo/svg/talkon-logo-full.svg)

### Logo Variations

| Variation | Use Case | File |
|-----------|----------|------|
| **Full Logo** | Headers, marketing materials, presentations | `talkon-logo-full.svg` |
| **Icon Only** | App icons, favicons, avatars, small spaces | `talkon-icon.svg` |
| **Text Only** | Text-only headers, watermarks | `talkon-text.svg` |
| **Dark Mode** | Dark backgrounds, night mode interfaces | `talkon-logo-dark.svg` |
| **Monochrome Black** | Single-color printing, B&W documents | `talkon-monochrome-black.svg` |
| **Monochrome White** | Dark backgrounds, overlays | `talkon-monochrome-white.svg` |

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **TalkON Blue** | `#0066FF` | rgb(0, 102, 255) | Primary brand color, buttons, links |
| **TalkON Teal** | `#00D4FF` | rgb(0, 212, 255) | Secondary, gradients, accents |

### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Online Green** | `#00CC88` | rgb(0, 204, 136) | Online status, "ON" text in logo, success states |
| **Activity Orange** | `#FF9500` | rgb(255, 149, 0) | Notifications, highlights, warnings |

### Neutral Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Dark Navy** | `#1a1a2e` | rgb(26, 26, 46) | Text, dark mode backgrounds |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Light backgrounds, text on dark |
| **Light Gray** | `#F5F5F7` | rgb(245, 245, 247) | Light mode backgrounds |
| **Medium Gray** | `#8E8E93` | rgb(142, 142, 147) | Secondary text, borders |

### Gradient Usage

The primary gradient flows from TalkON Blue to TalkON Teal:
```
linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)
```

Use for:
- Logo icon background
- Primary buttons
- Hero sections
- Feature highlights

---

## Typography

### Primary Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Weights

| Weight | Usage |
|--------|-------|
| **400 (Regular)** | Body text, descriptions |
| **500 (Medium)** | Labels, navigation |
| **600 (Semi-Bold)** | Subheadings, emphasis |
| **700 (Bold)** | Headlines, "Talk" in logo |
| **800 (Extra Bold)** | "ON" in logo, CTAs |

### Type Scale

| Style | Size | Weight | Line Height |
|-------|------|--------|-------------|
| **Display** | 48px | 800 | 1.1 |
| **H1** | 32px | 700 | 1.2 |
| **H2** | 24px | 700 | 1.3 |
| **H3** | 20px | 600 | 1.4 |
| **Body** | 16px | 400 | 1.5 |
| **Small** | 14px | 400 | 1.5 |
| **Caption** | 12px | 500 | 1.4 |

---

## Logo Usage Rules

### Clear Space

Maintain minimum clear space around the logo equal to the height of the "ON" text in the wordmark.

```
[Clear Space]
   ┌─────────────┐
   │   LOGO      │
   └─────────────┘
[Clear Space]
```

### Minimum Size

| Version | Minimum Width |
|---------|---------------|
| Full Logo | 120px |
| Icon Only | 16px |
| Text Only | 100px |

### Placement

- **Left-aligned**: Preferred for headers, navigation
- **Centered**: Acceptable for splash screens, auth pages
- **Avoid**: Right-aligned placement when possible

---

## Do's and Don'ts

### ✅ Do

- Use the logo in its complete form whenever possible
- Use the provided color variations for different backgrounds
- Maintain aspect ratio when resizing
- Use SVG format for digital applications
- Ensure sufficient contrast with background

### ❌ Don't

- Don't stretch, distort, or rotate the logo
- Don't change the logo colors outside the approved palette
- Don't add effects (drop shadows, glows, bevels) except the approved shadow
- Don't place the logo on busy or low-contrast backgrounds
- Don't separate the icon from the wordmark without using the approved standalone versions

### Incorrect Usage Examples

```
❌ Stretched: [TalkON     ]  
❌ Wrong colors: [PURPLE LOGO]
❌ Rotated: [↻ LOGO]
❌ Low contrast on similar color background
```

---

## Platform-Specific Guidelines

### Web Application

- Use SVG format for crisp rendering at all sizes
- Favicon: Use icon-only version at 16x16, 32x32, 48x48
- PWA icons: 192x192 and 512x512 with maskable variants
- Header: Full logo at 120-150px width

### Mobile Applications

- iOS: Follow Apple Human Interface Guidelines
  - App Icon: 1024x1024 source, let Xcode generate sizes
  - Use rounded corners automatically applied by iOS
- Android: Follow Material Design Guidelines
  - Adaptive icons for Android 8.0+
  - Legacy icons for older versions

### Desktop Application

- Windows: ICO format with multiple sizes (16-256px)
- macOS: ICNS format with all required sizes
- Linux: PNG format, 256x256 preferred

---

## Dark Mode

When the TalkON logo appears on dark backgrounds:

1. Use `talkon-logo-dark.svg` for full color
2. Use `talkon-monochrome-white.svg` for single-color applications
3. Ensure the gradient uses slightly brighter colors for visibility
4. The online indicator dot should use `#00E699` (brighter green)

---

## Download Assets

All logo files are available in:
- `/assets/logo/svg/` - Scalable vector files
- `/assets/logo/png/` - Raster files in various sizes

For questions about logo usage, contact the TalkON design team.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024 | Initial brand guidelines release |

---

*Last updated: 2024*
