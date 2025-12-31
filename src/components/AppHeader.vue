<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { getLocalizedRoute } from '../router/routeTranslations.js'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
]

function onLocaleChange(newLocale) {
  if (newLocale === locale.value) return
  
  localStorage.setItem('locale', newLocale)
  locale.value = newLocale
  
  // Navigate to the same page in the new locale
  const currentGizmo = route.meta?.gizmoKey
  let newPath = `/${newLocale}`
  
  if (currentGizmo) {
    const localizedRoute = getLocalizedRoute(currentGizmo, newLocale)
    newPath = `/${newLocale}/${localizedRoute}`
  } else if (route.name === 'credits') {
    newPath = `/${newLocale}/credits`
  }
  
  // Force page reload to ensure proper route handling
  window.location.href = newPath
}
</script>

<template>
  <header class="d-flex justify-content-between align-items-md-center pb-2 mb-5 border-bottom">
    <h1 class="h4">
      <router-link :to="`/${locale}`" class="d-flex align-items-center text-decoration-none">
        <svg class="bi bi-bootstrap-fill d-inline-block me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" width="32" height="32">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"></path>
        </svg>
        <span>Devgizmos</span>
      </router-link>
    </h1>
    <div class="d-flex align-items-center gap-3">
      <!-- Language Dropdown -->
      <div class="dropdown">
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="me-1">{{ languages.find(lang => lang.code === locale)?.flag }}</span>
          {{ languages.find(lang => lang.code === locale)?.name }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="language in languages" :key="language.code">
            <a class="dropdown-item" 
               :class="{ active: locale === language.code }"
               href="#"
               @click.prevent="onLocaleChange(language.code)">
              <span class="me-2">{{ language.flag }}</span>
              {{ language.name }}
            </a>
          </li>
        </ul>
      </div>
      
      <a href="https://github.com/saracmert/devgizmos/" target="_blank" rel="noopener" class="text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github"
          viewBox="0 0 16 16">
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
        View on GitHub
      </a>
    </div>
  </header>
</template>