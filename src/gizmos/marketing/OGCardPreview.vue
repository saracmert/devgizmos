<script setup>
import { ref, computed } from 'vue'

const url = ref('')
const loading = ref(false)
const error = ref('')
const og = ref({})
const twitter = ref({})

const requiredTwitterTags = [
  { name: 'twitter:card', label: 'twitter:card' },
  { name: 'twitter:title', label: 'twitter:title' },
  { name: 'twitter:description', label: 'twitter:description' },
  { name: 'twitter:image', label: 'twitter:image' }
]

const emptyTwitterTags = computed(() =>
  Object.entries(twitter.value)
    .filter(([k, v]) => v === '')
    .map(([k]) => k)
)
const missingTwitterTags = computed(() =>
  requiredTwitterTags
    .filter(tag => !twitter.value[tag.name])
    .map(tag => tag.label)
)

async function fetchMeta() {
  error.value = ''
  og.value = {}
  twitter.value = {}
  if (!url.value) {
    error.value = 'Please enter a URL.'
    return
  }
  loading.value = true
  try {
    const resp = await fetch(`/corsProxy?url=${encodeURIComponent(url.value)}`)
    const data = await resp.json()
    if (resp.ok) {
      og.value = data.og || {}
      twitter.value = data.twitter || {}
      if (Object.keys(og.value).length === 0 && Object.keys(twitter.value).length === 0) {
        error.value = 'No Open Graph or X Card meta tags found.'
      }
    } else {
      error.value = data.error || 'Failed to fetch meta tags.'
    }
  } catch (e) {
    error.value = 'Network error or invalid response.'
  }
  loading.value = false
}

function copyTags(tags) {
  const text = Object.entries(tags)
    .map(([k, v]) =>
      k.startsWith('og:')
        ? `<meta property="${k}" content="${v}">`
        : `<meta name="${k}" content="${v}">`
    )
    .join('\n')
  navigator.clipboard.writeText(text)
}

function getDomain(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function getFavicon(link) {
  try {
    const domain = new URL(link).hostname.replace(/^www\./, '')
    const origin = new URL(link).origin
    const favicon = `${origin}/favicon.ico`
    if (favicon.endsWith('.ico')) {
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`
    }
    return favicon
  } catch {
    return ''
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col mb-3">
        <h1>Open Graph & X Card Preview</h1>
        <span>
          You can use the Open Graph & X Card Preview Gizmo to preview and generate Open Graph and X Card meta tags for your web pages.
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-6 col-12">
        <div class="mb-3">
          <label class="form-label">URL</label>
          <input class="form-control" v-model="url" placeholder="https://example.com" @keyup.enter="fetchMeta" />
        </div>
        <button class="btn btn-primary" @click="fetchMeta" :disabled="loading">
          {{ loading ? 'Loading...' : 'Fetch Meta Tags' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="emptyTwitterTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following X Card tags are present but empty:
          <ul class="mb-0">
            <li v-for="tag in emptyTwitterTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
        <div v-if="missingTwitterTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following required X Card tags are missing:
          <ul class="mb-0">
            <li v-for="tag in missingTwitterTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-3 mt-lg-0">
        <!-- Card Preview -->
        <div
          class="og-card-preview shadow-sm mt-4"
          v-if="og['og:title'] || og['og:description'] || og['og:image'] || og['og:site_name'] || twitter['twitter:card']"
        >
          <div class="og-card-image" v-if="og['og:image'] || twitter['twitter:image']">
            <img :src="og['og:image'] || twitter['twitter:image']" alt="Preview Image" />
          </div>
          <div class="og-card-content">
            <div class="og-card-site mb-1">
              <img v-if="getFavicon(url)" :src="getFavicon(url)" class="og-card-favicon" alt="favicon" />
              <span>{{ og['og:site_name'] || getDomain(url) }}</span>
            </div>
            <div class="og-card-title">{{ og['og:title'] || twitter['twitter:title'] || 'Preview Title' }}</div>
            <div class="og-card-desc">{{ og['og:description'] || twitter['twitter:description'] || 'Preview description...' }}</div>
            <div class="og-card-url">{{ og['og:url'] || url }}</div>
          </div>
        </div>
        <div v-else-if="Object.keys(og).length === 0 && Object.keys(twitter).length === 0 && !error && !loading"
          class="text-muted mt-3">
          No meta tags to preview yet.
        </div>
        <div v-if="Object.keys(og).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            Open Graph Tags
            <button class="btn btn-outline-secondary btn-sm ms-auto" @click="copyTags(og)">Copy</button>
          </div>
          <textarea
            class="form-control mb-3"
            rows="7"
            readonly
            :value="Object.entries(og).map(([k,v]) => `<meta property=&quot;${k}&quot; content=&quot;${v}&quot;>`).join('\n')"
          ></textarea>
        </div>
        <div v-if="Object.keys(twitter).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            X Card Tags
            <button class="btn btn-outline-secondary btn-sm ms-auto" @click="copyTags(twitter)">Copy</button>
          </div>
          <textarea
            class="form-control mb-3"
            rows="7"
            readonly
            :value="Object.entries(twitter).map(([k,v]) => `<meta name=&quot;${k}&quot; content=&quot;${v}&quot;>`).join('\n')"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.og-card-preview {
  border-radius: 12px;
  border: 1px solid #e3e3e3;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 500px;
  min-width: 280px;
  min-height: 140px;
}
.og-card-image {
  width: 100%;
  height: 180px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.og-card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.og-card-content {
  padding: 16px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.og-card-site {
  font-size: 0.95rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}
.og-card-favicon {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin-right: 3px;
  background: #eee;
  object-fit: contain;
}
.og-card-title {
  font-weight: 600;
  font-size: 1.15rem;
  margin-bottom: 2px;
  color: #222;
}
.og-card-desc {
  font-size: 1rem;
  color: #444;
  margin-bottom: 6px;
  min-height: 22px;
}
.og-card-url {
  font-size: 0.93rem;
  color: #aaa;
  word-break: break-all;
}
</style>