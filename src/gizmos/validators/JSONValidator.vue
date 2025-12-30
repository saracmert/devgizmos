<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("json_validator.title") }}</h4>
            <p class="card-subtitle">{{ $t("json_validator.description") }}</p>
          </div>
          <div class="card-body">
            <!-- Input Section -->
            <div class="mb-4">
              <label for="jsonInput" class="form-label">{{ $t("json_validator.input_label") }}</label>
              <textarea 
                id="jsonInput"
                v-model="jsonInput" 
                class="form-control font-monospace" 
                rows="12" 
                :placeholder="$t('json_validator.placeholder')"
                @input="validateJSON"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2 mb-4">
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="validateJSON"
                :disabled="!jsonInput.trim()"
              >
                {{ $t("json_validator.validate") }}
              </button>
              <button 
                type="button" 
                class="btn btn-outline-secondary" 
                @click="clearInput"
              >
                {{ $t("json_validator.clear") }}
              </button>
              <button 
                type="button" 
                class="btn btn-outline-info" 
                @click="loadSample"
              >
                {{ $t("json_validator.load_sample") }}
              </button>
            </div>

            <!-- Results Section -->
            <div v-if="validationResult" class="mt-4">
              <div v-if="validationResult.isValid" class="alert alert-success" role="alert">
                <h5 class="alert-heading">
                  <i class="bi bi-check-circle me-2"></i>
                  {{ $t("json_validator.valid_json") }}
                </h5>
                <hr>
                <div class="row">
                  <div class="col-md-6">
                    <p class="mb-1"><strong>{{ $t("json_validator.size") }}:</strong> {{ formatBytes(jsonInput.length) }}</p>
                    <p class="mb-1"><strong>{{ $t("json_validator.characters") }}:</strong> {{ jsonInput.length.toLocaleString() }}</p>
                    <p class="mb-1"><strong>{{ $t("json_validator.lines") }}:</strong> {{ jsonInput.split('\n').length.toLocaleString() }}</p>
                  </div>
                  <div class="col-md-6">
                    <p class="mb-1"><strong>{{ $t("json_validator.type") }}:</strong> {{ validationResult.type }}</p>
                    <p class="mb-1" v-if="validationResult.keys"><strong>{{ $t("json_validator.keys") }}:</strong> {{ validationResult.keys }}</p>
                    <p class="mb-1" v-if="validationResult.length !== undefined"><strong>{{ $t("json_validator.length") }}:</strong> {{ validationResult.length.toLocaleString() }}</p>
                  </div>
                </div>
              </div>

              <div v-else class="alert alert-danger" role="alert">
                <h5 class="alert-heading">
                  <i class="bi bi-x-circle me-2"></i>
                  {{ $t("json_validator.invalid_json") }}
                </h5>
                <hr>
                <div class="row">
                  <div class="col-12">
                    <p><strong>{{ $t("json_validator.error") }}:</strong></p>
                    <pre class="bg-light p-2 rounded"><code>{{ validationResult.error }}</code></pre>
                    <p v-if="validationResult.line" class="mt-2">
                      <strong>{{ $t("json_validator.error_location") }}:</strong> 
                      {{ $t("json_validator.line") }} {{ validationResult.line }}, 
                      {{ $t("json_validator.column") }} {{ validationResult.column }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- JSON Schema Info -->
            <div class="mt-4">
              <div class="accordion" id="jsonInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="jsonInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#jsonInfoCollapse">
                      {{ $t("json_validator.about_json") }}
                    </button>
                  </h2>
                  <div id="jsonInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#jsonInfoAccordion">
                    <div class="accordion-body">
                      <h6>{{ $t("json_validator.valid_json_types") }}:</h6>
                      <ul>
                        <li><strong>{{ $t("json_validator.object") }}</strong>: <code>{"key": "value"}</code></li>
                        <li><strong>{{ $t("json_validator.array") }}</strong>: <code>[1, 2, 3]</code></li>
                        <li><strong>{{ $t("json_validator.string") }}</strong>: <code>"text"</code></li>
                        <li><strong>{{ $t("json_validator.number") }}</strong>: <code>42</code>, <code>3.14</code></li>
                        <li><strong>{{ $t("json_validator.boolean") }}</strong>: <code>true</code>, <code>false</code></li>
                        <li><strong>{{ $t("json_validator.null") }}</strong>: <code>null</code></li>
                      </ul>
                      <div class="mt-3">
                        <h6>{{ $t("json_validator.common_errors") }}:</h6>
                        <ul>
                          <li>{{ $t("json_validator.error_trailing_comma") }}</li>
                          <li>{{ $t("json_validator.error_single_quotes") }}</li>
                          <li>{{ $t("json_validator.error_unquoted_keys") }}</li>
                          <li>{{ $t("json_validator.error_missing_quotes") }}</li>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const jsonInput = ref('')
const validationResult = ref(null)

// Sample JSON data
const sampleJSON = {
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true,
  "lastLogin": null
}

// Parse error location from error message
const parseErrorLocation = (errorMessage) => {
  const lineMatch = errorMessage.match(/line (\d+)/i)
  const columnMatch = errorMessage.match(/column (\d+)/i)
  const positionMatch = errorMessage.match(/position (\d+)/i)
  
  let line = lineMatch ? parseInt(lineMatch[1]) : null
  let column = columnMatch ? parseInt(columnMatch[1]) : null
  
  // If we have position but not line/column, try to calculate
  if (positionMatch && !line && jsonInput.value) {
    const position = parseInt(positionMatch[1])
    const beforeError = jsonInput.value.substring(0, position)
    line = beforeError.split('\n').length
    column = beforeError.split('\n').pop().length + 1
  }
  
  return { line, column }
}

// Get type and additional info about parsed JSON
const analyzeJSON = (parsed) => {
  if (Array.isArray(parsed)) {
    return {
      type: 'Array',
      length: parsed.length
    }
  } else if (parsed === null) {
    return {
      type: 'null'
    }
  } else if (typeof parsed === 'object') {
    return {
      type: 'Object',
      keys: Object.keys(parsed).length
    }
  } else if (typeof parsed === 'string') {
    return {
      type: 'String',
      length: parsed.length
    }
  } else if (typeof parsed === 'number') {
    return {
      type: 'Number'
    }
  } else if (typeof parsed === 'boolean') {
    return {
      type: 'Boolean'
    }
  } else {
    return {
      type: typeof parsed
    }
  }
}

// Format bytes to human readable
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate JSON
const validateJSON = () => {
  if (!jsonInput.value.trim()) {
    validationResult.value = null
    return
  }
  
  try {
    const parsed = JSON.parse(jsonInput.value)
    const analysis = analyzeJSON(parsed)
    
    validationResult.value = {
      isValid: true,
      type: analysis.type,
      keys: analysis.keys,
      length: analysis.length
    }
  } catch (error) {
    const location = parseErrorLocation(error.message)
    
    validationResult.value = {
      isValid: false,
      error: error.message,
      line: location.line,
      column: location.column
    }
  }
}

// Clear input and results
const clearInput = () => {
  jsonInput.value = ''
  validationResult.value = null
}

// Load sample JSON
const loadSample = () => {
  jsonInput.value = JSON.stringify(sampleJSON, null, 2)
  validateJSON()
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

pre {
  font-size: 0.875rem;
  max-height: 200px;
  overflow-y: auto;
}
</style>