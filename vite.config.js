import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo-icon.png', 'logo-full.png'],
      manifest: {
        name: 'JackScanner',
        short_name: 'JackScanner',
        description: 'Smart AI Material Analyzer',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        icons: [
          {
            src: 'logo-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
