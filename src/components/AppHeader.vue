<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

function onLocaleChange(e) {
  localStorage.setItem('locale', e.target.value)
}
</script>

<template>
  <header class="d-flex justify-content-between align-items-md-center pb-2 mb-5 border-bottom">
    <h1 class="h4">
      <a href="/" class="d-flex align-items-center text-decoration-none">
        <svg class="bi bi-bootstrap-fill d-inline-block me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" width="32" height="32">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"></path>
        </svg>
        <span>Devgizmos</span>
      </a>
    </h1>
    <div class="d-flex align-items-center gap-3">
      <select v-model="locale" @change="onLocaleChange" class="form-select form-select-sm" style="width:auto;">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
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