import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import router from '../router/index.js'

// Translations
import en from '../translations/en.json'
import tr from '../translations/tr.json'
import zh from '../translations/zh.json'
import es from '../translations/es.json'
import fr from '../translations/fr.json'
import ja from '../translations/ja.json'
import de from '../translations/de.json'
import ru from '../translations/ru.json'
import hi from '../translations/hi.json'

// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

const supportedLocales = ['en', 'tr', 'zh', 'es', 'fr', 'ja', 'de', 'ru', 'hi']
const browserLocale = navigator.language?.split('-')[0] || 'en'
const savedLocale = localStorage.getItem('locale') || 
                   (supportedLocales.includes(browserLocale) ? browserLocale : 'en')

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, tr, zh, es, fr, ja, de, ru, hi }
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

const getPreferredTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('DevGizmos SW registered: ', registration);
        
        // Service Worker güncellemelerini kontrol et
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Yeni güncelleme var, kullanıcıyı bilgilendir
              showUpdateAvailable(newWorker);
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('DevGizmos SW registration failed: ', registrationError);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('DevGizmos install prompt triggered');
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

// Install promotion göster
function showInstallPromotion() {
  // Install button'u göster (gelecekte UI'da eklenebilir)
  console.log('DevGizmos can be installed');
}

// Service Worker güncellemesi için kullanıcı bildirimi
function showUpdateAvailable(newWorker) {
  if (confirm('New version of DevGizmos is available! Reload to update?')) {
    newWorker.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-bs-theme', getPreferredTheme());
  initCopy();
  
  // Network status izleme
  updateOnlineStatus();
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

// Online/Offline durumu güncelle
function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  document.body.classList.toggle('offline', !isOnline);
  
  if (!isOnline) {
    console.log('DevGizmos is now offline - cached tools available');
  } else {
    console.log('DevGizmos is online');
  }
}

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