<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("uuid_validator.title") }}</h4>
            <p class="card-subtitle">{{ $t("uuid_validator.description") }}</p>
          </div>
          <div class="card-body">
            <!-- Input Section -->
            <div class="mb-4">
              <label for="uuidInput" class="form-label">{{ $t("uuid_validator.input_label") }}</label>
              <textarea 
                id="uuidInput"
                v-model="inputValue" 
                class="form-control font-monospace" 
                rows="6" 
                :placeholder="$t('uuid_validator.placeholder')"
                @input="validateUUIDs"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2 mb-4">
              <button 
                type="button" 
                class="btn btn-outline-secondary" 
                @click="clearInput"
              >
                {{ $t("uuid_validator.clear") }}
              </button>
              <button 
                type="button" 
                class="btn btn-outline-info" 
                @click="generateSample"
              >
                {{ $t("uuid_validator.generate_sample") }}
              </button>
            </div>

            <!-- Results Section -->
            <div v-if="results.length > 0" class="mt-4">
              <h5>{{ $t("uuid_validator.results") }}</h5>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="card border-success">
                    <div class="card-header bg-success text-white">
                      <h6 class="mb-0">
                        <i class="bi bi-check-circle me-2"></i>
                        {{ $t("uuid_validator.valid_uuids") }} ({{ validCount }})
                      </h6>
                    </div>
                    <div class="card-body">
                      <div v-if="validUUIDs.length === 0" class="text-muted">
                        {{ $t("uuid_validator.no_valid") }}
                      </div>
                      <div v-else>
                        <div 
                          v-for="uuid in validUUIDs" 
                          :key="uuid.value"
                          class="mb-2 p-2 bg-light rounded d-flex justify-content-between align-items-center"
                        >
                          <code class="text-success">{{ uuid.value }}</code>
                          <div>
                            <span class="badge bg-info me-2">{{ uuid.version }}</span>
                            <button 
                              class="btn btn-sm btn-outline-secondary"
                              @click="copyToClipboard(uuid.value)"
                              :title="$t('generic.copy')"
                            >
                              <i class="bi bi-clipboard"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="card border-danger">
                    <div class="card-header bg-danger text-white">
                      <h6 class="mb-0">
                        <i class="bi bi-x-circle me-2"></i>
                        {{ $t("uuid_validator.invalid_uuids") }} ({{ invalidCount }})
                      </h6>
                    </div>
                    <div class="card-body">
                      <div v-if="invalidUUIDs.length === 0" class="text-muted">
                        {{ $t("uuid_validator.no_invalid") }}
                      </div>
                      <div v-else>
                        <div 
                          v-for="uuid in invalidUUIDs" 
                          :key="uuid"
                          class="mb-2 p-2 bg-light rounded"
                        >
                          <code class="text-danger">{{ uuid }}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Summary Stats -->
              <div class="mt-3">
                <div class="alert alert-info" role="alert">
                  <strong>{{ $t("uuid_validator.summary") }}:</strong>
                  {{ $t("uuid_validator.total_checked") }}: {{ totalChecked }}, 
                  {{ $t("uuid_validator.valid") }}: {{ validCount }}, 
                  {{ $t("uuid_validator.invalid") }}: {{ invalidCount }}
                </div>
              </div>
            </div>

            <!-- Info Section -->
            <div class="mt-4">
              <div class="accordion" id="uuidInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="uuidInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uuidInfoCollapse">
                      {{ $t("uuid_validator.uuid_info_title") }}
                    </button>
                  </h2>
                  <div id="uuidInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#uuidInfoAccordion">
                    <div class="accordion-body">
                      <h6>{{ $t("uuid_validator.supported_versions") }}:</h6>
                      <ul>
                        <li><strong>{{ $t("uuid_validator.version_1") }}</strong>: {{ $t("uuid_validator.version_1_desc") }}</li>
                        <li><strong>{{ $t("uuid_validator.version_3") }}</strong>: {{ $t("uuid_validator.version_3_desc") }}</li>
                        <li><strong>{{ $t("uuid_validator.version_4") }}</strong>: {{ $t("uuid_validator.version_4_desc") }}</li>
                        <li><strong>{{ $t("uuid_validator.version_5") }}</strong>: {{ $t("uuid_validator.version_5_desc") }}</li>
                      </ul>
                      <div class="mt-3">
                        <strong>{{ $t("uuid_validator.format_example") }}:</strong>
                        <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const inputValue = ref('')
const results = ref([])

// UUID regex patterns
const uuidRegex = {
  v1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  v3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  v4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  v5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  general: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
}

// Computed properties
const validUUIDs = computed(() => results.value.filter(r => r.isValid))
const invalidUUIDs = computed(() => results.value.filter(r => !r.isValid).map(r => r.value))
const validCount = computed(() => validUUIDs.value.length)
const invalidCount = computed(() => invalidUUIDs.value.length)
const totalChecked = computed(() => results.value.length)

// Validate UUID and determine version
const validateUUID = (uuid) => {
  const cleanUuid = uuid.trim()
  
  if (!cleanUuid) return null
  
  // Check each version
  for (const [version, regex] of Object.entries(uuidRegex)) {
    if (version === 'general') continue
    if (regex.test(cleanUuid)) {
      return {
        value: cleanUuid,
        isValid: true,
        version: `v${version.slice(1)}`
      }
    }
  }
  
  // Check general pattern but couldn't determine version
  if (uuidRegex.general.test(cleanUuid)) {
    return {
      value: cleanUuid,
      isValid: true,
      version: 'Unknown'
    }
  }
  
  return {
    value: cleanUuid,
    isValid: false
  }
}

// Validate all UUIDs in input
const validateUUIDs = () => {
  if (!inputValue.value.trim()) {
    results.value = []
    return
  }
  
  // Split by lines and filter non-empty
  const lines = inputValue.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
  
  results.value = lines
    .map(validateUUID)
    .filter(result => result !== null)
}

// Clear input and results
const clearInput = () => {
  inputValue.value = ''
  results.value = []
}

// Generate sample UUIDs
const generateSample = () => {
  const sampleUUIDs = [
    // Valid UUIDs
    '6ba7b810-9dad-11d1-80b4-00c04fd430c8', // v1
    '6ba7b811-9dad-31d1-80b4-00c04fd430c8', // v3
    'f47ac10b-58cc-4372-a567-0e02b2c3d479', // v4
    '6ba7b812-9dad-51d1-80b4-00c04fd430c8', // v5
    // Invalid UUIDs
    'not-a-uuid',
    '123-456-789',
    'f47ac10b-58cc-4372-a567-0e02b2c3d47', // too short
    'f47ac10b-58cc-6372-a567-0e02b2c3d479', // invalid version
  ]
  
  inputValue.value = sampleUUIDs.join('\n')
  validateUUIDs()
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