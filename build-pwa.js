#!/usr/bin/env node

const { generateSW } = require('workbox-build');
const fs = require('fs');
const path = require('path');

// Build directory
const buildDir = path.join(__dirname, 'dist');

// Service Worker generation
generateSW({
  swDest: path.join(buildDir, 'sw.js'),
  globDirectory: buildDir,
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}'
  ],
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
        }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  console.log(`Generated service worker, which will precache ${count} files, totaling ${size} bytes.`);
  if (warnings.length > 0) {
    console.warn('Warnings encountered:', warnings.join('\n'));
  }
  
  // Update service worker registration
  updateMainJS();
}).catch(console.error);

function updateMainJS() {
  console.log('PWA Service Worker generated successfully!');
  console.log('Service worker will be available at /sw.js');
}