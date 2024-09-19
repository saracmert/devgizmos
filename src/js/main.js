import { createApp } from 'vue'
import App from './App.vue'

// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

createApp(App).mount('#app')

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

  button.innerText = "Copied!";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}

window.initCopy = () => initCopy();