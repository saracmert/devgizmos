<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const jwtToken = ref('')
const header = ref(null)
const payload = ref(null)
const signature = ref('')
const error = ref('')
const copied = ref('')

// Helper: Pretty print JSON with error handling
function formatJSON(obj) {
  if (!obj) return ''
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return ''
  }
}

// Main decode logic
function decodeJWT() {
  error.value = ''
  header.value = null
  payload.value = null
  signature.value = ''
  if (!jwtToken.value) return

  // Split the token
  const parts = jwtToken.value.split('.')
  if (parts.length !== 3) {
    error.value = t('jwt.invalidParts')
    return
  }
  // Helper for base64url decode
  function b64urlDecode(str) {
    // Replace URL-safe chars, add padding if needed
    str = str.replace(/-/g, '+').replace(/_/g, '/')
    while (str.length % 4) str += '='
    try {
      // atob is available in browsers, fallback for Node (not needed here)
      return decodeURIComponent(escape(window.atob(str)))
    } catch {
      return null
    }
  }
  // Decode header
  const rawHeader = b64urlDecode(parts[0])
  if (!rawHeader) {
    error.value = t('jwt.invalidHeader')
    return
  }
  try {
    header.value = JSON.parse(rawHeader)
  } catch {
    error.value = t('jwt.headerNotValidJson')
    return
  }
  // Decode payload
  const rawPayload = b64urlDecode(parts[1])
  if (!rawPayload) {
    error.value = t('jwt.invalidPayload')
    return
  }
  try {
    payload.value = JSON.parse(rawPayload)
  } catch {
    error.value = t('jwt.payloadNotValidJson')
    return
  }
  // Signature (just show as base64url)
  signature.value = parts[2]
}

// Copy helpers
function copyToClipboard(val, type) {
  navigator.clipboard?.writeText(val)
  copied.value = type
  setTimeout(() => {
    if (copied.value === type) copied.value = ''
  }, 1200)
}

// Watch for changes and auto-decode
watch(jwtToken, decodeJWT)
</script>

<template>
  <div class="container-fluid my-4">
    <h2 class="mb-3">{{ getGizmoTitle('JWT') }}</h2>
    <p>
      {{ getGizmoDescription('JWT') }}<br>
      <small class="text-muted">{{ t('jwt.privacyNote') }}</small>
    </p>
    <textarea
      v-model="jwtToken"
      class="form-control font-monospace mb-3"
      rows="3"
      :placeholder="t('jwt.placeholder')"
      spellcheck="false"
      style="resize:vertical"
    />
    <div v-if="error" class="alert alert-warning">{{ error }}</div>
    <div v-else-if="header && payload">
      <div class="row g-3">
        <div class="col-lg-4">
          <div class="card h-100 border-primary">
            <div class="card-header p-2 bg-primary bg-opacity-10">{{ t('jwt.header') }}</div>
            <div class="card-body">
              <pre class="mb-2">{{ formatJSON(header) }}</pre>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="copyToClipboard(formatJSON(header), 'header')">
                <span v-if="copied==='header'">{{ t('jwt.copied') }}</span>
                <span v-else>{{ t('jwt.copy') }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card h-100 border-success">
            <div class="card-header p-2 bg-success bg-opacity-10">{{ t('jwt.payload') }}</div>
            <div class="card-body">
              <pre class="mb-2">{{ formatJSON(payload) }}</pre>
              <button
                class="btn btn-outline-success btn-sm"
                @click="copyToClipboard(formatJSON(payload), 'payload')">
                <span v-if="copied==='payload'">{{ t('jwt.copied') }}</span>
                <span v-else>{{ t('jwt.copy') }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card h-100 border-secondary">
            <div class="card-header p-2 bg-secondary bg-opacity-10">{{ t('jwt.signature') }}</div>
            <div class="card-body">
              <code class="d-block text-break" style="font-size:90%;">{{ signature }}</code>
              <button
                class="btn btn-outline-secondary btn-sm mt-2"
                @click="copyToClipboard(signature, 'signature')">
                <span v-if="copied==='signature'">{{ t('jwt.copied') }}</span>
                <span v-else>{{ t('jwt.copy') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>