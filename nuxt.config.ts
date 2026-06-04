// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const basePath = new URL(baseUrl).pathname // e.g. '/NewMechanic' or '/'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  runtimeConfig: {
    public: {
      baseUrl,
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    'nuxt-security',
    '@nuxtjs/seo'
  ],
  site: {
    url: baseUrl,
    name: 'Elias | Mechanic Portfolio',
    description: 'Professional mechanic portfolio — Engine diagnostics, brake systems, electrical repair, and custom fabrication.',
    defaultLocale: 'en'
  },
  app: {
    baseURL: basePath,
    head: {
      htmlAttrs: {},
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      title: 'Elias | Mechanic Portfolio',
      meta: [
        { name: 'description', content: 'Professional mechanic portfolio — Engine diagnostics, brake systems, electrical repair, and custom fabrication.' },
        { name: 'theme-color', content: '#d97706' },
        { name: 'msapplication-TileColor', content: '#d97706' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Elias Portfolio' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/icon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-192x192.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var s=localStorage.getItem('dark-mode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          type: 'text/javascript'
        }
      ]
    }
  },
  imports: {
    dirs: ['data']
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'static'
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    manifest: {
      id: '/',
      name: 'Elias | Mechanic Portfolio',
      short_name: 'Elias Portfolio',
      description: 'Professional mechanic portfolio showcasing skills and projects',
      start_url: '/',
      scope: '/',
      theme_color: '#d97706',
      background_color: '#f5f0eb',
      display: 'standalone',
      orientation: 'portrait-primary',
      categories: ['business', 'productivity'],
      icons: [
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      // Precache all static assets for full offline support
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json,webmanifest}'],
      // Offline fallback — the root index is always precached
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/api/, /\.[^/]+$/],
      // Clean up old caches on update
      cleanupOutdatedCaches: true,
      // Skip waiting — new SW activates immediately
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // HTML pages — network first, fall back to cache for offline
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            networkTimeoutSeconds: 3,
          },
        },
        {
          // Translation files — stale-while-revalidate (instant + background refresh)
          urlPattern: /.*\.json$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'i18n-translations',
            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
        {
          // Images — cache first
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // Google Fonts stylesheets
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
        {
          // Google Fonts webfont files
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // JS/CSS assets — cache first (hashed filenames)
          urlPattern: /\/_nuxt\/.*\.(?:js|css)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'nuxt-assets',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
  },
  security: {
    ssg: {
      hashScripts: false, // Don't add SHA hashes — they override 'unsafe-inline'
    },
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://www.gstatic.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'img-src': ["'self'", 'https://placehold.co', 'data:'],
        'connect-src': ["'self'"],
        'frame-src': ["'self'", 'https://*.google.com', 'https://*.openstreetmap.org']
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'SAMEORIGIN',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }
  },
  robots: {
    robotsTxt: false
  },
  ogImage: {
    enabled: false,
    zeroRuntime: true,
    defaults: {
      width: 1200,
      height: 630,
      extension: 'png',
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      fonts: ['Bebas Neue:400', 'DM Sans:400'],
    },
  },
  i18n: {
    baseUrl: baseUrl,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: '../i18n/locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
    bundle: {
      onlyLocales: ['en', 'fr', 'es'],
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      // Target modern browsers + Safari 14+ for maximum compat
      target: ['es2020', 'chrome87', 'firefox78', 'safari14', 'edge88'],
    },
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  $production: {
    ogImage: {
      enabled: true,
    },
  },
})
