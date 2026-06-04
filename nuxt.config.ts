// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    'nuxt-security',
    '@nuxtjs/seo'
  ],
  site: {
    url: 'https://sh1r00.github.io',
    name: 'Elias | Mechanic Portfolio',
    description: 'Professional mechanic portfolio — Engine diagnostics, brake systems, electrical repair, and custom fabrication.',
    defaultLocale: 'en'
  },
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {},
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Elias | Mechanic Portfolio',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
    preset: 'github-pages'
  },
  pwa: {
    registerType: 'prompt',
    manifest: {
      name: 'Elias | Mechanic Portfolio',
      short_name: 'Elias Portfolio',
      description: 'Professional mechanic portfolio showcasing skills and projects',
      theme_color: '#d97706',
      background_color: '#f5f0eb',
      display: 'standalone',
      icons: [
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json}'],
      runtimeCaching: [
        {
          urlPattern: /\/_i18n\/.*\.json$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'i18n-translations',
            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
        {
          urlPattern: /\/__og-image__\/.*\.png$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'og-images',
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
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
      dropMessageCompiler: true,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
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
