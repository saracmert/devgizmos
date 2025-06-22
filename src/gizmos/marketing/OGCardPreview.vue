<script setup>
import { ref } from 'vue'

const url = ref('')
const loading = ref(false)
const error = ref('')
const og = ref({})
const twitter = ref({})

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
      </div>
      <div class="col-lg-6 col-12 mt-3 mt-lg-0">
        <div v-if="Object.keys(og).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            Open Graph Tags
            <button class="btn btn-outline-secondary btn-sm ms-auto" @click="copyTags(og)">Copy</button>
          </div>
          <textarea class="form-control bg-light mb-3" rows="7" readonly :value="Object.entries(og).map(([k,v]) => `<meta property=\"${k}\" content=\"${v}\">`).join('\n')"></textarea>
        </div>
        <div v-if="Object.keys(twitter).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            X Card Tags
            <button class="btn btn-outline-secondary btn-sm ms-auto" @click="copyTags(twitter)">Copy</button>
          </div>
          <textarea class="form-control bg-light mb-3" rows="7" readonly :value="Object.entries(twitter).map(([k,v]) => `<meta name=\"${k}\" content=\"${v}\">`).join('\n')"></textarea>
        </div>
        <div class="card shadow-sm mt-4" v-if="og['og:title'] || og['og:description'] || og['og:image']">
          <div class="card-body">
            <div class="d-flex">
              <img v-if="og['og:image']" :src="og['og:image']" alt="Preview" style="width:96px;height:96px;object-fit:cover;border-radius:8px;margin-right:16px;">
              <div>
                <div class="fw-bold fs-5">{{ og['og:title'] || 'Preview Title' }}</div>
                <div class="text-muted mb-2">{{ og['og:site_name'] || og['og:url'] || url }}</div>
                <div>{{ og['og:description'] || 'Preview description...' }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="Object.keys(og).length === 0 && Object.keys(twitter).length === 0 && !error && !loading" class="text-muted mt-3">
          No meta tags to preview yet.
        </div>
      </div>
    </div>
  </div>
</template>