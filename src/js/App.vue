<script setup>
import { ref, computed } from 'vue'
import Header from '../components/AppHeader.vue'
import Gizmos from '../components/AppGizmos.vue'
import Footer from '../components/AppFooter.vue'
import NotFound from "../components/AppNotFound.vue"

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
import AsciiUnicodeConverter from '../gizmos/text/AsciiUnicodeConverter.vue'

// Formatter Gizmos
import JsonBeautifier from '../gizmos/formatter/JSONBeautifier.vue'
import HtmlBeautifier from '../gizmos/formatter/HTMLBeautifier.vue'
import HtmlMinifier from '../gizmos/formatter/HTMLMinifier.vue'
import SQLBeautifier from '../gizmos/formatter/SQLBeautifier.vue'

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

// Validator Gizmos
import RegexTester from '../gizmos/validators/RegexTester.vue'

import robots from '../../public/robots.txt'

const routes = {
  '/': Gizmos,
  'JSONBeautifier': JsonBeautifier,
  'HTMLBeautifier': HtmlBeautifier,
  'HTMLMinifier': HtmlMinifier,
  'StringBuilder': StringBuilder,
  'Base64': Base64,
  'DiffChecker': DiffChecker,
  "GuidGenerator": GuidGenerator,
  "PasswordGenerator": PasswordGenerator,
  "MD5": MD5,
  "SHA": SHA,
  "MyIPAddress": MyIPAddress,
  "CIDRCalculator": CIDRCalculator,
  "URL": URL,
  "CaseConverter": CaseConverter,
  "LoremIpsumGenerator": LoremIpsumGenerator,
  "FakeEmailGenerator": FakeEmailGenerator,
  "UTMLinkGenerator": UTMLinkGenerator,
  "RegexTester": RegexTester,
  "JWT": JWT,
  "ChecksumCalculator": ChecksumCalculator,
  "SQLBeautifier": SQLBeautifier,
  "URLParser": URLParser,
  "SlugGenerator": SlugGenerator,
  "TextDeduplicator": TextDeduplicator,
  "TextSorterReverser": TextSorterReverser,
  "AsciiUnicodeConverter": AsciiUnicodeConverter,

  "robots.txt": robots
}

const currentPath = ref(window.location.pathname)

window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div class="container-fluid py-2 px-3 mx-auto">
    <Header />
    <component :is="currentView" />
    <Footer />
  </div>
</template>