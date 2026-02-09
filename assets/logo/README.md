# TalkON Logo Assets

This directory contains all TalkON logo assets in various formats and sizes.

## Directory Structure

```
assets/logo/
├── svg/                    # Source vector files
│   ├── talkon-logo-full.svg       # Full color logo (default)
│   ├── talkon-icon.svg            # Icon only
│   ├── talkon-text.svg            # Text only
│   ├── talkon-logo-dark.svg       # Dark mode version
│   ├── talkon-icon-dark.svg       # Icon for dark mode
│   ├── talkon-monochrome-black.svg
│   └── talkon-monochrome-white.svg
├── png/                    # Raster exports (to be generated)
│   ├── favicon/            # Browser favicons
│   ├── pwa/                # PWA icons
│   ├── ios/                # iOS app icons
│   ├── android/            # Android app icons
│   └── general/            # General purpose PNGs
├── asset-specs.json        # Asset specifications
└── generate-pngs.js        # PNG generation script
```

## SVG Files (Primary)

The SVG files are the primary source of truth. Use these whenever possible:

- **Web apps**: Import directly as React components or use `<img>` tags
- **Design tools**: Import into Figma, Sketch, Adobe Illustrator
- **Print**: Export to required format from vector source

## Generating PNG Assets

To generate PNG assets from SVG sources:

```bash
cd assets/logo
node generate-pngs.js
```

For production use, convert SVGs using:
- **ImageMagick**: `convert -background none input.svg output.png`
- **Inkscape**: `inkscape -w 192 -h 192 input.svg -o output.png`
- **Online**: CloudConvert, Convertio

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0066FF` | Main brand color |
| Teal | `#00D4FF` | Secondary, gradients |
| Online Green | `#00CC88` | Online indicator, "ON" text |
| Activity Orange | `#FF9500` | Highlights, notifications |
| Dark Navy | `#1a1a2e` | Text on light backgrounds |

## Integration

### Web
Copy/link files to `packages/web-app/public/`

### Mobile iOS
Copy files to `packages/mobile-app/ios/Assets.xcassets/`

### Mobile Android
Copy files to `packages/mobile-app/android/app/src/main/res/`

### Desktop
Copy files to `packages/desktop-app/build/`

## License

TalkON logo and brand assets are proprietary and should not be used without permission.
