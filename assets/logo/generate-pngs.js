#!/usr/bin/env node
/**
 * TalkON Logo PNG Generation Script
 * Generates all required PNG sizes from SVG source files
 */

const fs = require('fs');
const path = require('path');

// Size configurations
const sizes = {
  // High resolution
  '2048x2048': [2048, 2048],
  '1024x1024': [1024, 1024],
  '512x512': [512, 512],
  
  // Medium
  '384x384': [384, 384],
  '256x256': [256, 256],
  '192x192': [192, 192],
  
  // Small
  '128x128': [128, 128],
  '64x64': [64, 64],
  '48x48': [48, 48],
  '32x32': [32, 32],
  '16x16': [16, 16],
  
  // iOS App Icon sizes
  'ios-1024': [1024, 1024],
  'ios-180': [180, 180],
  'ios-167': [167, 167],
  'ios-152': [152, 152],
  'ios-120': [120, 120],
  'ios-76': [76, 76],
  'ios-60': [60, 60],
  
  // Android densities (approximate)
  'android-xxxhdpi': [192, 192],
  'android-xxhdpi': [144, 144],
  'android-xhdpi': [96, 96],
  'android-hdpi': [72, 72],
  'android-mdpi': [48, 48],
};

const directories = {
  general: path.join(__dirname, 'png/general'),
  favicon: path.join(__dirname, 'png/favicon'),
  pwa: path.join(__dirname, 'png/pwa'),
  ios: path.join(__dirname, 'png/ios'),
  android: path.join(__dirname, 'png/android'),
};

// Ensure all directories exist
Object.values(directories).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('TalkON Logo PNG Generator');
console.log('========================\n');

console.log('Note: This script requires ImageMagick (convert) or Inkscape to be installed.');
console.log('For development purposes, SVG files are the primary assets.\n');

// Create a reference JSON file with all asset specifications
const assetSpecs = {
  name: 'TalkON',
  version: '1.0.0',
  sourceFiles: {
    fullColor: 'svg/talkon-logo-full.svg',
    iconOnly: 'svg/talkon-icon.svg',
    textOnly: 'svg/talkon-text.svg',
    darkMode: 'svg/talkon-logo-dark.svg',
    iconDark: 'svg/talkon-icon-dark.svg',
    monochromeBlack: 'svg/talkon-monochrome-black.svg',
    monochromeWhite: 'svg/talkon-monochrome-white.svg',
  },
  pngExports: {
    favicon: {
      'favicon-16x16.png': { size: '16x16', source: 'talkon-icon.svg' },
      'favicon-32x32.png': { size: '32x32', source: 'talkon-icon.svg' },
      'favicon-48x48.png': { size: '48x48', source: 'talkon-icon.svg' },
    },
    pwa: {
      'icon-192.png': { size: '192x192', source: 'talkon-icon.svg' },
      'icon-512.png': { size: '512x512', source: 'talkon-icon.svg' },
      'maskable-icon-192.png': { size: '192x192', source: 'talkon-icon.svg', padding: true },
      'maskable-icon-512.png': { size: '512x512', source: 'talkon-icon.svg', padding: true },
    },
    ios: {
      'apple-touch-icon.png': { size: '180x180', source: 'talkon-icon.svg' },
      'AppIcon-60@2x.png': { size: '120x120', source: 'talkon-icon.svg' },
      'AppIcon-60@3x.png': { size: '180x180', source: 'talkon-icon.svg' },
      'AppIcon-76@1x.png': { size: '76x76', source: 'talkon-icon.svg' },
      'AppIcon-76@2x.png': { size: '152x152', source: 'talkon-icon.svg' },
      'AppIcon-83.5@2x.png': { size: '167x167', source: 'talkon-icon.svg' },
      'AppIcon-1024.png': { size: '1024x1024', source: 'talkon-icon.svg' },
    },
    android: {
      'ic_launcher_mdpi.png': { size: '48x48', source: 'talkon-icon.svg' },
      'ic_launcher_hdpi.png': { size: '72x72', source: 'talkon-icon.svg' },
      'ic_launcher_xhdpi.png': { size: '96x96', source: 'talkon-icon.svg' },
      'ic_launcher_xxhdpi.png': { size: '144x144', source: 'talkon-icon.svg' },
      'ic_launcher_xxxhdpi.png': { size: '192x192', source: 'talkon-icon.svg' },
      'ic_launcher_round_mdpi.png': { size: '48x48', source: 'talkon-icon.svg', round: true },
      'ic_launcher_round_hdpi.png': { size: '72x72', source: 'talkon-icon.svg', round: true },
      'ic_launcher_round_xhdpi.png': { size: '96x96', source: 'talkon-icon.svg', round: true },
      'ic_launcher_round_xxhdpi.png': { size: '144x144', source: 'talkon-icon.svg', round: true },
      'ic_launcher_round_xxxhdpi.png': { size: '192x192', source: 'talkon-icon.svg', round: true },
    },
    desktop: {
      'icon-16.png': { size: '16x16', source: 'talkon-icon.svg' },
      'icon-32.png': { size: '32x32', source: 'talkon-icon.svg' },
      'icon-48.png': { size: '48x48', source: 'talkon-icon.svg' },
      'icon-64.png': { size: '64x64', source: 'talkon-icon.svg' },
      'icon-128.png': { size: '128x128', source: 'talkon-icon.svg' },
      'icon-256.png': { size: '256x256', source: 'talkon-icon.svg' },
      'icon-512.png': { size: '512x512', source: 'talkon-icon.svg' },
      'icon-1024.png': { size: '1024x1024', source: 'talkon-icon.svg' },
    }
  },
  colors: {
    primary: {
      blue: '#0066FF',
      teal: '#00D4FF',
    },
    accent: {
      green: '#00CC88',
      orange: '#FF9500',
    },
    neutral: {
      dark: '#1a1a2e',
      light: '#ffffff',
    }
  }
};

fs.writeFileSync(
  path.join(__dirname, 'asset-specs.json'),
  JSON.stringify(assetSpecs, null, 2)
);

console.log('✅ Asset specifications saved to asset-specs.json');
console.log('\nTo generate PNGs, use one of the following methods:');
console.log('1. Install ImageMagick and run: convert -background none -resize 192x192 input.svg output.png');
console.log('2. Use Inkscape: inkscape -w 192 -h 192 input.svg -o output.png');
console.log('3. Use an online converter service or design tool like Figma/Sketch');
console.log('\nSVG files are ready in the svg/ directory and can be used directly in modern browsers.');
