// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/Mind-Guard/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg'
      ],
      manifest: {
        name: 'Mind Guard',
        short_name: 'MindGuard',
        description: 'Protect your mind — PWA',
        theme_color: '#0a4b78',
        background_color: '#8b5cf6',
        display: 'standalone',
        start_url: '/Mind-Guard/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: { cacheName: 'html-cache' },
          },
          {
            urlPattern: ({ request }) => ['style', 'script', 'image'].includes(request.destination),
            handler: 'CacheFirst',
            options: { cacheName: 'asset-cache' },
          },
        ],
      },
    }),
  ],
});
