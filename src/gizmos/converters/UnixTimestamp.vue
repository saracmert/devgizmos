<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("unix_timestamp.title") }}</h4>
            <p class="card-subtitle">{{ $t("unix_timestamp.description") }}</p>
          </div>
          <div class="card-body">
            <!-- Current Timestamp -->
            <div class="row mb-4">
              <div class="col-12">
                <div class="alert alert-info" role="alert">
                  <h6 class="alert-heading">{{ $t("unix_timestamp.current_time") }}</h6>
                  <div class="row">
                    <div class="col-md-6">
                      <strong>{{ $t("unix_timestamp.unix_timestamp") }}:</strong> 
                      <code>{{ currentTimestamp }}</code>
                      <button class="btn btn-sm btn-outline-info ms-2" @click="copyToClipboard(currentTimestamp.toString())">
                        <i class="bi bi-clipboard"></i>
                      </button>
                    </div>
                    <div class="col-md-6">
                      <strong>{{ $t("unix_timestamp.human_readable") }}:</strong> 
                      <code>{{ currentDateTime }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <!-- Timestamp to Date Converter -->
              <div class="col-md-6">
                <div class="card border-primary">
                  <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">{{ $t("unix_timestamp.timestamp_to_date") }}</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="timestampInput" class="form-label">{{ $t("unix_timestamp.unix_timestamp") }}</label>
                      <div class="input-group">
                        <input 
                          id="timestampInput"
                          v-model="timestampInput" 
                          type="text" 
                          class="form-control font-monospace"
                          :placeholder="$t('unix_timestamp.timestamp_placeholder')"
                          @input="convertTimestampToDate"
                        >
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="timestampInput = currentTimestamp.toString(); convertTimestampToDate()"
                        >
                          {{ $t("unix_timestamp.now") }}
                        </button>
                      </div>
                    </div>

                    <div v-if="timestampResult.isValid" class="alert alert-success">
                      <h6>{{ $t("unix_timestamp.converted_date") }}:</h6>
                      <div class="mb-2">
                        <strong>{{ $t("unix_timestamp.local_time") }}:</strong><br>
                        <code>{{ timestampResult.localTime }}</code>
                        <button class="btn btn-sm btn-outline-success ms-2" @click="copyToClipboard(timestampResult.localTime)">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                      <div class="mb-2">
                        <strong>{{ $t("unix_timestamp.utc_time") }}:</strong><br>
                        <code>{{ timestampResult.utcTime }}</code>
                        <button class="btn btn-sm btn-outline-success ms-2" @click="copyToClipboard(timestampResult.utcTime)">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                      <div class="mb-2">
                        <strong>{{ $t("unix_timestamp.iso_format") }}:</strong><br>
                        <code>{{ timestampResult.isoFormat }}</code>
                        <button class="btn btn-sm btn-outline-success ms-2" @click="copyToClipboard(timestampResult.isoFormat)">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                      <div>
                        <strong>{{ $t("unix_timestamp.relative_time") }}:</strong><br>
                        <code>{{ timestampResult.relativeTime }}</code>
                      </div>
                    </div>

                    <div v-else-if="timestampInput && !timestampResult.isValid" class="alert alert-danger">
                      {{ $t("unix_timestamp.invalid_timestamp") }}: {{ timestampResult.error }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Date to Timestamp Converter -->
              <div class="col-md-6">
                <div class="card border-success">
                  <div class="card-header bg-success text-white">
                    <h5 class="mb-0">{{ $t("unix_timestamp.date_to_timestamp") }}</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="dateInput" class="form-label">{{ $t("unix_timestamp.date_time") }}</label>
                      <input 
                        id="dateInput"
                        v-model="dateInput" 
                        type="datetime-local" 
                        class="form-control"
                        @input="convertDateToTimestamp"
                      >
                    </div>

                    <div class="mb-3">
                      <label for="dateStringInput" class="form-label">{{ $t("unix_timestamp.or_enter_date_string") }}</label>
                      <div class="input-group">
                        <input 
                          id="dateStringInput"
                          v-model="dateStringInput" 
                          type="text" 
                          class="form-control"
                          :placeholder="$t('unix_timestamp.date_string_placeholder')"
                          @input="convertDateStringToTimestamp"
                        >
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="setCurrentDate"
                        >
                          {{ $t("unix_timestamp.now") }}
                        </button>
                      </div>
                    </div>

                    <div v-if="dateResult.isValid" class="alert alert-success">
                      <h6>{{ $t("unix_timestamp.converted_timestamp") }}:</h6>
                      <div class="mb-2">
                        <strong>{{ $t("unix_timestamp.unix_timestamp") }}:</strong><br>
                        <code>{{ dateResult.timestamp }}</code>
                        <button class="btn btn-sm btn-outline-success ms-2" @click="copyToClipboard(dateResult.timestamp.toString())">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                      <div>
                        <strong>{{ $t("unix_timestamp.milliseconds") }}:</strong><br>
                        <code>{{ dateResult.milliseconds }}</code>
                        <button class="btn btn-sm btn-outline-success ms-2" @click="copyToClipboard(dateResult.milliseconds.toString())">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                    </div>

                    <div v-else-if="(dateInput || dateStringInput) && !dateResult.isValid" class="alert alert-danger">
                      {{ $t("unix_timestamp.invalid_date") }}: {{ dateResult.error }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Section -->
            <div class="mt-4">
              <div class="accordion" id="timestampInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="timestampInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#timestampInfoCollapse">
                      {{ $t("unix_timestamp.about_unix_timestamp") }}
                    </button>
                  </h2>
                  <div id="timestampInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#timestampInfoAccordion">
                    <div class="accordion-body">
                      <p>{{ $t("unix_timestamp.unix_description") }}</p>
                      <h6>{{ $t("unix_timestamp.common_formats") }}:</h6>
                      <ul>
                        <li><strong>{{ $t("unix_timestamp.seconds") }}</strong>: 1640995200 (10 digits)</li>
                        <li><strong>{{ $t("unix_timestamp.milliseconds") }}</strong>: 1640995200000 (13 digits)</li>
                      </ul>
                      <h6>{{ $t("unix_timestamp.supported_date_formats") }}:</h6>
                      <ul>
                        <li>ISO 8601: 2023-01-01T12:00:00Z</li>
                        <li>RFC 2822: Mon, 01 Jan 2023 12:00:00 GMT</li>
                        <li>{{ $t("unix_timestamp.short_format") }}: 2023-01-01 12:00:00</li>
                        <li>{{ $t("unix_timestamp.us_format") }}: 01/01/2023 12:00:00</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive state
const currentTimestamp = ref(Math.floor(Date.now() / 1000))
const currentDateTime = ref('')
const timestampInput = ref('')
const dateInput = ref('')
const dateStringInput = ref('')
const timestampResult = ref({ isValid: false })
const dateResult = ref({ isValid: false })

let interval = null

// Update current time every second
const updateCurrentTime = () => {
  currentTimestamp.value = Math.floor(Date.now() / 1000)
  currentDateTime.value = new Date().toLocaleString()
}

// Format relative time
const getRelativeTime = (date) => {
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return `${seconds} saniye önce`
  if (minutes < 60) return `${minutes} dakika önce`
  if (hours < 24) return `${hours} saat önce`
  if (days < 30) return `${days} gün önce`
  return date.toLocaleDateString()
}

// Convert timestamp to date
const convertTimestampToDate = () => {
  if (!timestampInput.value.trim()) {
    timestampResult.value = { isValid: false }
    return
  }

  try {
    let timestamp = parseInt(timestampInput.value.trim())
    
    // Handle milliseconds vs seconds
    if (timestamp.toString().length === 13) {
      timestamp = Math.floor(timestamp / 1000)
    }
    
    if (isNaN(timestamp) || timestamp < 0) {
      throw new Error('Invalid timestamp format')
    }

    const date = new Date(timestamp * 1000)
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp value')
    }

    timestampResult.value = {
      isValid: true,
      localTime: date.toLocaleString(),
      utcTime: date.toUTCString(),
      isoFormat: date.toISOString(),
      relativeTime: getRelativeTime(date)
    }
  } catch (error) {
    timestampResult.value = {
      isValid: false,
      error: error.message
    }
  }
}

// Convert date to timestamp
const convertDateToTimestamp = () => {
  if (!dateInput.value) {
    dateResult.value = { isValid: false }
    return
  }

  try {
    const date = new Date(dateInput.value)
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const timestamp = Math.floor(date.getTime() / 1000)
    const milliseconds = date.getTime()

    dateResult.value = {
      isValid: true,
      timestamp,
      milliseconds
    }
  } catch (error) {
    dateResult.value = {
      isValid: false,
      error: error.message
    }
  }
}

// Convert date string to timestamp
const convertDateStringToTimestamp = () => {
  if (!dateStringInput.value.trim()) {
    dateResult.value = { isValid: false }
    return
  }

  try {
    const date = new Date(dateStringInput.value.trim())
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format')
    }

    const timestamp = Math.floor(date.getTime() / 1000)
    const milliseconds = date.getTime()

    dateResult.value = {
      isValid: true,
      timestamp,
      milliseconds
    }
  } catch (error) {
    dateResult.value = {
      isValid: false,
      error: error.message
    }
  }
}

// Set current date
const setCurrentDate = () => {
  const now = new Date()
  dateInput.value = now.toISOString().slice(0, 16)
  dateStringInput.value = now.toISOString()
  convertDateToTimestamp()
}

// Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    // Fallback
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// Lifecycle
onMounted(() => {
  updateCurrentTime()
  interval = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.font-monospace {
  font-family: 'SF Mono', Monaco, 'Inconsolata', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
}

.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}
</style>