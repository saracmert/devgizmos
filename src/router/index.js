import { createRouter, createWebHistory } from 'vue-router'
import { routeTranslations, getGizmoFromRoute, getLocalizedRoute } from './routeTranslations.js'

// Import components
import Gizmos from '../components/AppGizmos.vue'
import Credits from '../components/Credits.vue'
import NotFound from '../components/AppNotFound.vue'
import GizmoWrapper from '../components/GizmoWrapper.vue'

const supportedLocales = ['en', 'tr', 'zh', 'es', 'fr', 'ja', 'de', 'ru', 'hi']

// Legacy URL to gizmo key mapping for redirects
const legacyRouteMapping = {
  'JSONBeautifier': 'json-beautifier',
  'JSONMinifier': 'json-minifier',
  'MongoDBJsonConverter': 'mongodb-json-converter',
  'HTMLBeautifier': 'html-beautifier',
  'HTMLMinifier': 'html-minifier',
  'StringBuilder': 'string-builder',
  'Base64': 'base64-encoder',
  'DiffChecker': 'diff-checker',
  'GuidGenerator': 'guid-generator',
  'PasswordGenerator': 'password-generator',
  'MD5': 'md5-generator',
  'SHA': 'sha-generator',
  'MyIPAddress': 'my-ip-address',
  'CIDRCalculator': 'cidr-calculator',
  'URL': 'url-encoder',
  'CaseConverter': 'case-converter',
  'LoremIpsumGenerator': 'lorem-ipsum-generator',
  'FakeEmailGenerator': 'fake-email-generator',
  'UTMLinkGenerator': 'utm-link-generator',
  'RegexTester': 'regex-tester',
  'UUIDValidator': 'uuid-validator',
  'JSONValidator': 'json-validator',
  'UnixTimestamp': 'unix-timestamp',
  'FileSizeConverter': 'file-size-converter',
  'RomanNumeralConverter': 'roman-numeral-converter',
  'JWT': 'jwt-decoder',
  'ChecksumCalculator': 'checksum-calculator',
  'SQLBeautifier': 'sql-beautifier',
  'EInvoiceViewer': 'e-invoice-viewer',
  'URLParser': 'url-parser',
  'SlugGenerator': 'slug-generator',
  'TextDeduplicator': 'text-deduplicator',
  'TextSorterReverser': 'text-sorter-reverser',
  'AsciiUnicodeConverter': 'ascii-unicode-converter',
  'OGCardPreview': 'og-card-preview',
  'QRCodeGenerator': 'qr-code-generator',
  'ColorPaletteGenerator': 'color-palette-generator',
  'ColorContrastChecker': 'color-contrast-checker'
}

const routes = [
  {
    path: '/',
    redirect: (to) => {
      // Detect browser locale or use saved locale
      const browserLocale = navigator.language?.split('-')[0] || 'en'
      const savedLocale = localStorage.getItem('locale') || 
                         (supportedLocales.includes(browserLocale) ? browserLocale : 'en')
      return `/${savedLocale}`
    }
  },
  {
    path: '/:locale(en|tr|zh|es|fr|ja|de|ru|hi)',
    component: {
      template: '<router-view />'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Gizmos,
        meta: { requiresLocale: true }
      },
      {
        path: 'credits',
        name: 'credits',
        component: Credits,
        meta: { requiresLocale: true }
      },
      {
        path: ':gizmo',
        name: 'gizmo',
        component: GizmoWrapper,
        beforeEnter: (to, from, next) => {
          const locale = to.params.locale
          const routeName = to.params.gizmo
          const gizmoKey = getGizmoFromRoute(routeName, locale)
          
          if (gizmoKey) {
            to.meta.gizmoKey = gizmoKey
            next()
          } else {
            next({ name: '404', params: { locale } })
          }
        },
        meta: { requiresLocale: true }
      }
    ]
  },
  {
    path: '/:locale(en|tr|zh|es|fr|ja|de|ru|hi)/404',
    name: '404',
    component: NotFound,
    meta: { requiresLocale: true }
  },
  {
    // Catch all for legacy routes and old non-localized routes
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const savedLocale = localStorage.getItem('locale') || 'en'
      const path = to.path.startsWith('/') ? to.path.slice(1) : to.path
      
      // Handle empty path
      if (!path) {
        return `/${savedLocale}`
      }
      
      // Handle Credits route
      if (path === 'Credits') {
        return `/${savedLocale}/credits`
      }
      
      // Check if it's a legacy gizmo route and map it to new gizmo key
      if (legacyRouteMapping[path]) {
        const gizmoKey = legacyRouteMapping[path]
        const localizedRoute = getLocalizedRoute(gizmoKey, savedLocale)
        return `/${savedLocale}/${localizedRoute}`
      }
      
      // Check if it's already a gizmo key
      const gizmoKeys = Object.keys(routeTranslations.en)
      if (gizmoKeys.includes(path)) {
        const localizedRoute = getLocalizedRoute(path, savedLocale)
        return `/${savedLocale}/${localizedRoute}`
      }
      
      // If nothing matches, redirect to 404
      return `/${savedLocale}/404`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard to handle locale
router.beforeEach((to, from, next) => {
  // Set locale from route params
  if (to.params.locale && supportedLocales.includes(to.params.locale)) {
    localStorage.setItem('locale', to.params.locale)
  }
  
  next()
})

export default router