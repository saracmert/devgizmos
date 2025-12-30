<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("file_size_converter.title") }}</h4>
            <p class="card-subtitle">{{ $t("file_size_converter.description") }}</p>
          </div>
          <div class="card-body">
            <!-- Input Section -->
            <div class="row mb-4">
              <div class="col-md-8">
                <label for="sizeInput" class="form-label">{{ $t("file_size_converter.input_label") }}</label>
                <input 
                  id="sizeInput"
                  v-model="inputValue" 
                  type="number" 
                  class="form-control" 
                  :placeholder="$t('file_size_converter.input_placeholder')"
                  min="0"
                  step="any"
                  @input="convertSize"
                >
              </div>
              <div class="col-md-4">
                <label for="inputUnit" class="form-label">{{ $t("file_size_converter.input_unit") }}</label>
                <select id="inputUnit" v-model="inputUnit" class="form-select" @change="convertSize">
                  <option v-for="unit in units" :key="unit.key" :value="unit.key">
                    {{ unit.name }} ({{ unit.symbol }})
                  </option>
                </select>
              </div>
            </div>

            <!-- Quick Buttons -->
            <div class="mb-4">
              <h6>{{ $t("file_size_converter.quick_examples") }}:</h6>
              <div class="d-flex flex-wrap gap-2">
                <button 
                  v-for="example in quickExamples" 
                  :key="example.label"
                  class="btn btn-sm btn-outline-secondary"
                  @click="setExample(example)"
                >
                  {{ example.label }}
                </button>
              </div>
            </div>

            <!-- Results Section -->
            <div v-if="results.length > 0" class="row">
              <div class="col-12">
                <h5>{{ $t("file_size_converter.conversion_results") }}</h5>
                <div class="row g-3">
                  <div 
                    v-for="result in results" 
                    :key="result.key"
                    class="col-sm-6 col-lg-4"
                  >
                    <div class="card" :class="{'border-primary': result.key === inputUnit}">
                      <div class="card-body">
                        <h6 class="card-title">{{ result.name }}</h6>
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <code class="fs-6">{{ result.value }}</code>
                            <small class="text-muted ms-1">{{ result.symbol }}</small>
                          </div>
                          <button 
                            class="btn btn-sm btn-outline-primary"
                            @click="copyToClipboard(result.value)"
                            :title="$t('generic.copy')"
                          >
                            <i class="bi bi-clipboard"></i>
                          </button>
                        </div>
                        <div v-if="result.scientific" class="mt-1">
                          <small class="text-muted">{{ result.scientific }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Binary vs Decimal Info -->
            <div class="mt-4">
              <div class="accordion" id="fileSizeInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="fileSizeInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fileSizeInfoCollapse">
                      {{ $t("file_size_converter.about_file_sizes") }}
                    </button>
                  </h2>
                  <div id="fileSizeInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#fileSizeInfoAccordion">
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-6">
                          <h6>{{ $t("file_size_converter.binary_system") }} ({{ $t("file_size_converter.base_1024") }}):</h6>
                          <ul class="list-unstyled">
                            <li>1 KiB = 1,024 Bytes</li>
                            <li>1 MiB = 1,024 KiB = 1,048,576 Bytes</li>
                            <li>1 GiB = 1,024 MiB</li>
                            <li>1 TiB = 1,024 GiB</li>
                            <li>1 PiB = 1,024 TiB</li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <h6>{{ $t("file_size_converter.decimal_system") }} ({{ $t("file_size_converter.base_1000") }}):</h6>
                          <ul class="list-unstyled">
                            <li>1 KB = 1,000 Bytes</li>
                            <li>1 MB = 1,000 KB = 1,000,000 Bytes</li>
                            <li>1 GB = 1,000 MB</li>
                            <li>1 TB = 1,000 GB</li>
                            <li>1 PB = 1,000 TB</li>
                          </ul>
                        </div>
                      </div>
                      <div class="mt-3">
                        <p class="mb-0">
                          <strong>{{ $t("file_size_converter.note") }}:</strong> 
                          {{ $t("file_size_converter.note_description") }}
                        </p>
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
const inputUnit = ref('bytes')

// Unit definitions
const units = [
  // Binary units (base 1024)
  { key: 'bytes', name: 'Bytes', symbol: 'B', multiplier: 1, isBinary: false },
  { key: 'kib', name: 'Kibibytes', symbol: 'KiB', multiplier: 1024, isBinary: true },
  { key: 'mib', name: 'Mebibytes', symbol: 'MiB', multiplier: 1024 ** 2, isBinary: true },
  { key: 'gib', name: 'Gibibytes', symbol: 'GiB', multiplier: 1024 ** 3, isBinary: true },
  { key: 'tib', name: 'Tebibytes', symbol: 'TiB', multiplier: 1024 ** 4, isBinary: true },
  { key: 'pib', name: 'Pebibytes', symbol: 'PiB', multiplier: 1024 ** 5, isBinary: true },
  
  // Decimal units (base 1000)
  { key: 'kb', name: 'Kilobytes', symbol: 'KB', multiplier: 1000, isBinary: false },
  { key: 'mb', name: 'Megabytes', symbol: 'MB', multiplier: 1000 ** 2, isBinary: false },
  { key: 'gb', name: 'Gigabytes', symbol: 'GB', multiplier: 1000 ** 3, isBinary: false },
  { key: 'tb', name: 'Terabytes', symbol: 'TB', multiplier: 1000 ** 4, isBinary: false },
  { key: 'pb', name: 'Petabytes', symbol: 'PB', multiplier: 1000 ** 5, isBinary: false },
  
  // Bits
  { key: 'bits', name: 'Bits', symbol: 'bit', multiplier: 1/8, isBinary: false }
]

// Quick examples
const quickExamples = [
  { label: '1 KB', value: 1, unit: 'kb' },
  { label: '1 MB', value: 1, unit: 'mb' },
  { label: '1 GB', value: 1, unit: 'gb' },
  { label: '1 TB', value: 1, unit: 'tb' },
  { label: '256 MB', value: 256, unit: 'mb' },
  { label: '4 GB', value: 4, unit: 'gb' },
  { label: '500 GB', value: 500, unit: 'gb' },
  { label: '2 TB', value: 2, unit: 'tb' }
]

// Format number with appropriate precision
const formatNumber = (num) => {
  if (num === 0) return '0'
  if (num < 0.000001) return num.toExponential(2)
  if (num < 0.01) return num.toFixed(6).replace(/\.?0+$/, '')
  if (num < 1) return num.toFixed(4).replace(/\.?0+$/, '')
  if (num < 1000) return num.toFixed(2).replace(/\.?0+$/, '')
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

// Get scientific notation for very large numbers
const getScientificNotation = (num) => {
  if (num >= 1e6 || num <= 1e-6) {
    return num.toExponential(2)
  }
  return null
}

// Computed results
const results = computed(() => {
  const value = parseFloat(inputValue.value)
  if (isNaN(value) || value < 0) return []
  
  const inputUnitData = units.find(u => u.key === inputUnit.value)
  if (!inputUnitData) return []
  
  // Convert to bytes first
  const bytes = value * inputUnitData.multiplier
  
  // Convert to all other units
  return units.map(unit => {
    const convertedValue = bytes / unit.multiplier
    const formatted = formatNumber(convertedValue)
    const scientific = getScientificNotation(convertedValue)
    
    return {
      key: unit.key,
      name: unit.name,
      symbol: unit.symbol,
      value: formatted,
      scientific,
      isBinary: unit.isBinary
    }
  })
})

// Convert size when input changes
const convertSize = () => {
  // Results are computed automatically
}

// Set example
const setExample = (example) => {
  inputValue.value = example.value
  inputUnit.value = example.unit
  convertSize()
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
.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

code {
  font-size: 1rem;
  color: #0d6efd;
}
</style>