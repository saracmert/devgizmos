<template>
  <div class="row">
    <div class="col mb-3">
      <h1>{{ title }}</h1>
      <span>{{ description }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { tm } = useI18n()

// Get gizmo info from route meta
const gizmoKey = computed(() => route.meta?.gizmoKey)

// Find gizmo in categories to get title and description
const title = computed(() => {
  if (!gizmoKey.value) return 'DevGizmos'
  
  try {
    const categories = tm('gizmos.categories', { returnObjects: true }) || []
    const componentName = mapGizmoKeyToComponent(gizmoKey.value)
    
    for (const category of categories) {
      const item = category.items?.find(item => item.gizmo === componentName)
      if (item) {
        return item.title
      }
    }
  } catch (error) {
    console.error('Error in title computed:', error)
  }
  
  return gizmoKey.value
})

const description = computed(() => {
  if (!gizmoKey.value) return ''
  
  try {
    const categories = tm('gizmos.categories', { returnObjects: true }) || []
    const componentName = mapGizmoKeyToComponent(gizmoKey.value)
    
    for (const category of categories) {
      const item = category.items?.find(item => item.gizmo === componentName)
      if (item) {
        return item.description
      }
    }
  } catch (error) {
    console.error('Error in description computed:', error)
  }
  
  return ''
})

// Map gizmo-key to component name used in translation files
function mapGizmoKeyToComponent(key) {
  const mapping = {
    'json-beautifier': 'JSONBeautifier',
    'json-minifier': 'JSONMinifier', 
    'html-beautifier': 'HTMLBeautifier',
    'html-minifier': 'HTMLMinifier',
    'case-converter': 'CaseConverter',
    'diff-checker': 'DiffChecker',
    'password-generator': 'PasswordGenerator',
    'guid-generator': 'GuidGenerator',
    'url-encoder': 'URL',
    'base64-encoder': 'Base64',
    'md5-generator': 'MD5',
    'sha-generator': 'SHA',
    'qr-code-generator': 'QRCodeGenerator',
    'color-palette-generator': 'ColorPaletteGenerator',
    'color-contrast-checker': 'ColorContrastChecker',
    'lorem-ipsum-generator': 'LoremIpsumGenerator',
    'fake-email-generator': 'FakeEmailGenerator',
    'slug-generator': 'SlugGenerator',
    'text-deduplicator': 'TextDeduplicator',
    'url-parser': 'URLParser',
    'string-builder': 'StringBuilder',
    'regex-tester': 'RegexTester',
    'uuid-validator': 'UUIDValidator',
    'json-validator': 'JSONValidator',
    'unix-timestamp': 'UnixTimestamp',
    'file-size-converter': 'FileSizeConverter',
    'roman-numeral-converter': 'RomanNumeralConverter',
    'checksum-calculator': 'ChecksumCalculator',
    'sql-beautifier': 'SQLBeautifier',
    'e-invoice-viewer': 'EInvoiceViewer',
    'jwt-decoder': 'JWT',
    'mongodb-json-converter': 'MongoDBJsonConverter',
    'ascii-unicode-converter': 'AsciiUnicodeConverter',
    'text-sorter-reverser': 'TextSorterReverser',
    'utm-link-generator': 'UTMLinkGenerator',
    'og-card-preview': 'OGCardPreview',
    'my-ip-address': 'MyIPAddress',
    'cidr-calculator': 'CIDRCalculator'
  }
  return mapping[key] || key
}
</script>