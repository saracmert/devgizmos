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

// Formatter Gizmos
import JsonBeautifier from '../gizmos/formatter/JSONBeautifier.vue'

// Encode - Decode Gizmos
import Base64 from '../gizmos/encode-decode/Base64.vue'
import URL from '../gizmos/encode-decode/URL.vue'

// Cryptography Gizmos
import GuidGenerator from '../gizmos/cryptography/GuidGenerator.vue'
import PasswordGenerator from '../gizmos/cryptography/PasswordGenerator.vue'
import MD5 from '../gizmos/cryptography/MD5.vue'
import SHA from '../gizmos/cryptography/SHA.vue'

// Network Gizmos
import MyIPAddress from '../gizmos/network/MyIPAddress.vue'

// Marketing Gizmos
import UTMLinkGenerator from '../gizmos/marketing/UTMLinkGenerator.vue'

import robots from '../../public/robots.txt'

const routes = {
  '/': Gizmos,
  'JSONBeautifier': JsonBeautifier,
  'StringBuilder': StringBuilder,
  'Base64': Base64,
  'DiffChecker': DiffChecker,
  "GuidGenerator": GuidGenerator,
  "PasswordGenerator": PasswordGenerator,
  "MD5": MD5,
  "SHA": SHA,
  "MyIPAddress": MyIPAddress,
  "URL": URL,
  "CaseConverter": CaseConverter,
  "LoremIpsumGenerator": LoremIpsumGenerator,
  "FakeEmailGenerator": FakeEmailGenerator,
  "UTMLinkGenerator": UTMLinkGenerator,

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