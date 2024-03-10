import { createApp } from 'vue'
import App from './App.vue'

// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

createApp(App).mount('#app')

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })


const getPreferredTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-bs-theme', getPreferredTheme());
})