<script setup>
import { onMounted, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Header from '../components/AppHeader.vue'
import Footer from '../components/AppFooter.vue'
import { useSEO } from '../composables/useSEO.js'

const route = useRoute()
const { locale } = useI18n()
const { updateSEO } = useSEO()

// Provide locale to all child components for reactivity
provide('locale', locale)

// Update SEO when route or locale changes
watch([() => route?.name, () => route?.params, locale], () => {
  if (route && route.meta) {
    const gizmoKey = route.meta.gizmoKey || null
    updateSEO(gizmoKey)
  }
}, { immediate: true, flush: 'post' })

onMounted(async () => {
  // Initialize Bootstrap components
  const { Popover } = await import('bootstrap')
  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
      new Popover(popover)
    })

  // Set initial theme
  const getPreferredTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  document.documentElement.setAttribute('data-bs-theme', getPreferredTheme())
  
  // Initialize copy functionality
  initCopy()
})

function initCopy() {
  setTimeout(function() {
    const copyButtonLabel = "Copy"
    let blocks = document.querySelectorAll("pre")

    blocks.forEach((block) => {
      if (navigator.clipboard) {
        if (block.querySelector("button") == null) {
          let button = document.createElement("button")
          button.innerText = copyButtonLabel
          button.classList.add("copy-code-button")
          button.addEventListener("click", async () => {
            await copyCode(block, button)
          })
          block.appendChild(button)
        }
      }
    })
  }, 1000)
}

async function copyCode(block, button) {
  let code = block.querySelector("code")
  let text = code.innerText

  await navigator.clipboard.writeText(text)

  button.innerText = "Copied"

  setTimeout(() => {
    button.innerText = "Copy"
  }, 700)
}
</script>

<template>
  <div class="container-fluid py-2 px-3 mx-auto">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>