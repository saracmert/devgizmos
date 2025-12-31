<template>
  <component :is="currentComponent" :key="componentKey" />
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getGizmoFromRoute } from '../router/routeTranslations.js'

// Text Gizmos
import StringBuilder from '../gizmos/text/StringBuilder.vue'
import DiffChecker from '../gizmos/text/DiffChecker.vue'
import CaseConverter from '../gizmos/text/CaseConverter.vue'
import LoremIpsumGenerator from '../gizmos/text/LoremIpsumGenerator.vue'
import FakeEmailGenerator from '../gizmos/text/FakeEmailGenerator.vue'
import URLParser from '../gizmos/text/URLParser.vue'
import SlugGenerator from '../gizmos/text/SlugGenerator.vue'
import TextDeduplicator from '../gizmos/text/TextDeduplicator.vue'
import TextSorterReverser from '../gizmos/text/TextSorterReverser.vue'
import AsciiUnicodeConverter from '../gizmos/text/ASCIIUnicodeConverter.vue'

// Formatter Gizmos
import JsonBeautifier from '../gizmos/formatter/JSONBeautifier.vue'
import JsonMinifier from '../gizmos/formatter/JSONMinifier.vue'
import MongoDBJsonConverter from '../gizmos/formatter/MongoDBJsonConverter.vue'
import HtmlBeautifier from '../gizmos/formatter/HTMLBeautifier.vue'
import HtmlMinifier from '../gizmos/formatter/HTMLMinifier.vue'
import SQLBeautifier from '../gizmos/formatter/SQLBeautifier.vue'
import EInvoiceViewer from '../gizmos/formatter/EInvoiceViewer.vue'

// Encode - Decode Gizmos
import Base64 from '../gizmos/encode-decode/Base64.vue'
import URL from '../gizmos/encode-decode/URL.vue'
import JWT from '../gizmos/encode-decode/JWT.vue'

// Cryptography Gizmos
import GuidGenerator from '../gizmos/cryptography/GuidGenerator.vue'
import PasswordGenerator from '../gizmos/cryptography/PasswordGenerator.vue'
import MD5 from '../gizmos/cryptography/MD5.vue'
import SHA from '../gizmos/cryptography/SHA.vue'
import ChecksumCalculator from '../gizmos/cryptography/ChecksumCalculator.vue'

// Network Gizmos
import MyIPAddress from '../gizmos/network/MyIPAddress.vue'
import CIDRCalculator from '../gizmos/network/CIDRCalculator.vue'

// Marketing Gizmos
import UTMLinkGenerator from '../gizmos/marketing/UTMLinkGenerator.vue'
import OGCardPreview from '../gizmos/marketing/OGCardPreview.vue'

// Design Gizmos
import QRCodeGenerator from '../gizmos/design/QRCodeGenerator.vue'
import ColorPaletteGenerator from '../gizmos/design/ColorPaletteGenerator.vue'
import ColorContrastChecker from '../gizmos/design/ColorContrastChecker.vue'

// Validator Gizmos
import RegexTester from '../gizmos/validators/RegexTester.vue'
import UUIDValidator from '../gizmos/validators/UUIDValidator.vue'
import JSONValidator from '../gizmos/validators/JSONValidator.vue'

// Converter Gizmos
import UnixTimestamp from '../gizmos/converters/UnixTimestamp.vue'
import FileSizeConverter from '../gizmos/converters/FileSizeConverter.vue'
import RomanNumeralConverter from '../gizmos/converters/RomanNumeralConverter.vue'

import NotFound from './AppNotFound.vue'

const route = useRoute()
const { locale } = useI18n()
const componentKey = ref(0) // Force component re-render when language changes

// Watch for route changes and locale changes with flush post
watch(() => [route.params.gizmo, route.params.locale, locale.value], ([gizmo, routeLocale, currentLocale]) => {
  if (gizmo && (routeLocale || currentLocale)) {
    const gizmoKey = getGizmoFromRoute(gizmo, routeLocale || currentLocale)
    if (gizmoKey) {
      route.meta.gizmoKey = gizmoKey
      // Force component re-render on language change
      componentKey.value++
    }
  }
}, { immediate: true, flush: 'post' })

// Additional watch specifically for locale changes to force re-render
watch(locale, () => {
  componentKey.value++
}, { flush: 'post' })

// Component mapping for gizmos
const gizmoComponents = {
  'json-beautifier': JsonBeautifier,
  'json-minifier': JsonMinifier,
  'mongodb-json-converter': MongoDBJsonConverter,
  'html-beautifier': HtmlBeautifier,
  'html-minifier': HtmlMinifier,
  'string-builder': StringBuilder,
  'base64-encoder': Base64,
  'diff-checker': DiffChecker,
  'guid-generator': GuidGenerator,
  'password-generator': PasswordGenerator,
  'md5-generator': MD5,
  'sha-generator': SHA,
  'my-ip-address': MyIPAddress,
  'cidr-calculator': CIDRCalculator,
  'url-encoder': URL,
  'case-converter': CaseConverter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'fake-email-generator': FakeEmailGenerator,
  'utm-link-generator': UTMLinkGenerator,
  'regex-tester': RegexTester,
  'uuid-validator': UUIDValidator,
  'json-validator': JSONValidator,
  'unix-timestamp': UnixTimestamp,
  'file-size-converter': FileSizeConverter,
  'roman-numeral-converter': RomanNumeralConverter,
  'jwt-decoder': JWT,
  'checksum-calculator': ChecksumCalculator,
  'sql-beautifier': SQLBeautifier,
  'e-invoice-viewer': EInvoiceViewer,
  'url-parser': URLParser,
  'slug-generator': SlugGenerator,
  'text-deduplicator': TextDeduplicator,
  'text-sorter-reverser': TextSorterReverser,
  'ascii-unicode-converter': AsciiUnicodeConverter,
  'og-card-preview': OGCardPreview,
  'qr-code-generator': QRCodeGenerator,
  'color-palette-generator': ColorPaletteGenerator,
  'color-contrast-checker': ColorContrastChecker
}

const currentComponent = computed(() => {
  const gizmoKey = route.meta?.gizmoKey
  
  if (!gizmoKey) {
    return NotFound
  }
  
  const component = gizmoComponents[gizmoKey]
  
  if (!component) {
    return NotFound
  }
  
  return component
})
</script>