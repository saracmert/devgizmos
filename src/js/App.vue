<script setup>
import { ref, computed } from 'vue'
import Header from '../components/AppHeader.vue'
import Gizmos from '../components/AppGizmos.vue'
import Footer from '../components/AppFooter.vue'
import NotFound from "../components/AppNotFound.vue"

// Gizmos Begin
import JsonBeautifier from '../gizmos/JSON/JSONBeautifier.vue'
import StringBuilder from '../gizmos/csharp/StringBuilder.vue'
import Base64 from '../gizmos/encode-decode/Base64.vue'
import DiffChecker from '../gizmos/code/DiffChecker.vue'
import GuidGenerator from '../gizmos/code/GuidGenerator.vue'
import PasswordGenerator from '../gizmos/other/PasswordGenerator.vue'
import MyIPAddress from '../gizmos/network/MyIPAddress.vue'
import URL from '../gizmos/encode-decode/URL.vue'
// Gizmos End

const routes = {
  '/': Gizmos,
  '/JSONBeautifier': JsonBeautifier,
  '/StringBuilder': StringBuilder,
  '/Base64': Base64,
  '/DiffChecker': DiffChecker,
  "/GuidGenerator": GuidGenerator,
  "/PasswordGenerator": PasswordGenerator,
  "/MyIPAddress": MyIPAddress,
  "/URL": URL
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div class="container py-4 px-3 mx-auto">
    <Header />
    <component :is="currentView" />
    <Footer />
  </div>
</template>