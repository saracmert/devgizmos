import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

// Translations
import en from '../translations/en.json'
import tr from '../translations/tr.json'

// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

const browserLocale = navigator.language?.split('-')[0] || 'en'
const savedLocale = localStorage.getItem('locale') || (['en', 'tr'].includes(browserLocale) ? browserLocale : 'en')

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, tr }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

const getPreferredTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-bs-theme', getPreferredTheme());
  initCopy();
})

function initCopy() {
  setTimeout(function() {
    const copyButtonLabel = "Copy";
    let blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
      if (navigator.clipboard) {
        if (block.querySelector("button") == null) {
          let button = document.createElement("button");
          button.className = "btn btn-sm btn-primary ms-2";
          button.innerText = copyButtonLabel;
          block.appendChild(button);
          button.addEventListener("click", async () => {
            await copy(block, button);
          });
        }
      }
    });
  }, 150);
}

async function copy(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;

  await navigator.clipboard.writeText(text);

  button.innerText = t('generic.copied');

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}

window.initCopy = () => initCopy();