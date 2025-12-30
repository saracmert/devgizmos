<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("color_contrast_checker.title") }}</h4>
            <p class="card-subtitle">{{ $t("color_contrast_checker.description") }}</p>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Color Inputs -->
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <h6 class="mb-0">{{ $t("color_contrast_checker.foreground_color") }}</h6>
                      </div>
                      <div class="card-body text-center">
                        <div class="mb-3">
                          <div 
                            class="color-preview mb-2" 
                            :style="{ backgroundColor: foregroundColor }"
                          ></div>
                          <input 
                            v-model="foregroundColor" 
                            type="color" 
                            class="form-control form-control-color mx-auto"
                            @change="calculateContrast"
                          >
                        </div>
                        <input 
                          v-model="foregroundColor" 
                          type="text" 
                          class="form-control text-center font-monospace"
                          :placeholder="$t('color_contrast_checker.hex_placeholder')"
                          @input="calculateContrast"
                        >
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <h6 class="mb-0">{{ $t("color_contrast_checker.background_color") }}</h6>
                      </div>
                      <div class="card-body text-center">
                        <div class="mb-3">
                          <div 
                            class="color-preview mb-2" 
                            :style="{ backgroundColor: backgroundColor }"
                          ></div>
                          <input 
                            v-model="backgroundColor" 
                            type="color" 
                            class="form-control form-control-color mx-auto"
                            @change="calculateContrast"
                          >
                        </div>
                        <input 
                          v-model="backgroundColor" 
                          type="text" 
                          class="form-control text-center font-monospace"
                          :placeholder="$t('color_contrast_checker.hex_placeholder')"
                          @input="calculateContrast"
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick Color Presets -->
                <div class="card mt-3">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_contrast_checker.quick_presets") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="row g-2">
                      <div 
                        v-for="preset in colorPresets" 
                        :key="preset.name"
                        class="col-6"
                      >
                        <button 
                          class="btn btn-outline-secondary btn-sm w-100"
                          @click="applyPreset(preset)"
                        >
                          <div class="d-flex align-items-center">
                            <div 
                              class="preset-color me-2" 
                              :style="{ backgroundColor: preset.foreground }"
                            ></div>
                            <div 
                              class="preset-color me-2" 
                              :style="{ backgroundColor: preset.background }"
                            ></div>
                            <span class="small">{{ preset.name }}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preview and Results -->
              <div class="col-md-6">
                <!-- Preview -->
                <div class="card">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_contrast_checker.preview") }}</h6>
                  </div>
                  <div class="card-body">
                    <div 
                      class="color-preview-large p-4 rounded text-center"
                      :style="{ 
                        backgroundColor: backgroundColor, 
                        color: foregroundColor,
                        border: '1px solid #dee2e6'
                      }"
                    >
                      <h5>{{ $t("color_contrast_checker.sample_heading") }}</h5>
                      <p class="mb-2">{{ $t("color_contrast_checker.sample_text") }}</p>
                      <small>{{ $t("color_contrast_checker.sample_small_text") }}</small>
                      <div class="mt-3">
                        <button class="btn btn-sm me-2" :style="{ backgroundColor: foregroundColor, color: backgroundColor }">
                          {{ $t("color_contrast_checker.sample_button") }}
                        </button>
                        <a href="#" :style="{ color: foregroundColor }">{{ $t("color_contrast_checker.sample_link") }}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contrast Results -->
                <div v-if="contrastResult" class="card mt-3">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_contrast_checker.contrast_results") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="row text-center">
                      <div class="col-12 mb-3">
                        <h4 class="mb-1">{{ contrastResult.ratio.toFixed(2) }}:1</h4>
                        <small class="text-muted">{{ $t("color_contrast_checker.contrast_ratio") }}</small>
                      </div>
                    </div>

                    <div class="row g-3">
                      <!-- Normal Text -->
                      <div class="col-md-6">
                        <div class="card border">
                          <div class="card-body text-center">
                            <h6 class="card-title">{{ $t("color_contrast_checker.normal_text") }}</h6>
                            <div class="mb-2">
                              <span 
                                class="badge fs-6"
                                :class="contrastResult.normalAA ? 'bg-success' : 'bg-danger'"
                              >
                                AA {{ contrastResult.normalAA ? '✓' : '✗' }}
                              </span>
                            </div>
                            <div>
                              <span 
                                class="badge fs-6"
                                :class="contrastResult.normalAAA ? 'bg-success' : 'bg-warning'"
                              >
                                AAA {{ contrastResult.normalAAA ? '✓' : '✗' }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Large Text -->
                      <div class="col-md-6">
                        <div class="card border">
                          <div class="card-body text-center">
                            <h6 class="card-title">{{ $t("color_contrast_checker.large_text") }}</h6>
                            <div class="mb-2">
                              <span 
                                class="badge fs-6"
                                :class="contrastResult.largeAA ? 'bg-success' : 'bg-danger'"
                              >
                                AA {{ contrastResult.largeAA ? '✓' : '✗' }}
                              </span>
                            </div>
                            <div>
                              <span 
                                class="badge fs-6"
                                :class="contrastResult.largeAAA ? 'bg-success' : 'bg-warning'"
                              >
                                AAA {{ contrastResult.largeAAA ? '✓' : '✗' }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Overall Rating -->
                    <div class="mt-3 text-center">
                      <div class="alert" :class="getOverallRatingClass()">
                        <strong>{{ $t("color_contrast_checker.overall_rating") }}:</strong>
                        {{ getOverallRating() }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- WCAG Information -->
            <div class="mt-4">
              <div class="accordion" id="wcagInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="wcagInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcagInfoCollapse">
                      {{ $t("color_contrast_checker.wcag_guidelines") }}
                    </button>
                  </h2>
                  <div id="wcagInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#wcagInfoAccordion">
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-6">
                          <h6>{{ $t("color_contrast_checker.aa_requirements") }}:</h6>
                          <ul>
                            <li>{{ $t("color_contrast_checker.normal_text") }}: {{ $t("color_contrast_checker.min_ratio_aa_normal") }}</li>
                            <li>{{ $t("color_contrast_checker.large_text") }}: {{ $t("color_contrast_checker.min_ratio_aa_large") }}</li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <h6>{{ $t("color_contrast_checker.aaa_requirements") }}:</h6>
                          <ul>
                            <li>{{ $t("color_contrast_checker.normal_text") }}: {{ $t("color_contrast_checker.min_ratio_aaa_normal") }}</li>
                            <li>{{ $t("color_contrast_checker.large_text") }}: {{ $t("color_contrast_checker.min_ratio_aaa_large") }}</li>
                          </ul>
                        </div>
                      </div>
                      <div class="mt-3">
                        <p class="mb-0">
                          <strong>{{ $t("color_contrast_checker.large_text_definition") }}:</strong>
                          {{ $t("color_contrast_checker.large_text_description") }}
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
import { ref, onMounted } from 'vue'

// Reactive state
const foregroundColor = ref('#000000')
const backgroundColor = ref('#ffffff')
const contrastResult = ref(null)

// Color presets
const colorPresets = [
  { name: 'Black/White', foreground: '#000000', background: '#ffffff' },
  { name: 'White/Black', foreground: '#ffffff', background: '#000000' },
  { name: 'Blue/White', foreground: '#0066cc', background: '#ffffff' },
  { name: 'White/Blue', foreground: '#ffffff', background: '#0066cc' },
  { name: 'Green/White', foreground: '#006600', background: '#ffffff' },
  { name: 'Red/White', foreground: '#cc0000', background: '#ffffff' },
  { name: 'Gray/Light', foreground: '#333333', background: '#f5f5f5' },
  { name: 'Dark/Yellow', foreground: '#333333', background: '#ffff99' }
]

// Convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Calculate relative luminance
const getRelativeLuminance = (rgb) => {
  const { r, g, b } = rgb
  
  const rsRGB = r / 255
  const gsRGB = g / 255
  const bsRGB = b / 255
  
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)
  
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

// Calculate contrast ratio
const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  if (!rgb1 || !rgb2) return 1
  
  const lum1 = getRelativeLuminance(rgb1)
  const lum2 = getRelativeLuminance(rgb2)
  
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

// Calculate contrast and WCAG compliance
const calculateContrast = () => {
  const ratio = getContrastRatio(foregroundColor.value, backgroundColor.value)
  
  contrastResult.value = {
    ratio,
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  }
}

// Apply color preset
const applyPreset = (preset) => {
  foregroundColor.value = preset.foreground
  backgroundColor.value = preset.background
  calculateContrast()
}

// Get overall rating
const getOverallRating = () => {
  if (!contrastResult.value) return ''
  
  const { normalAAA, normalAA, largeAAA, largeAA } = contrastResult.value
  
  if (normalAAA) return 'Excellent (AAA)'
  if (normalAA) return 'Good (AA)'
  if (largeAAA) return 'Fair (Large text AAA)'
  if (largeAA) return 'Poor (Large text AA only)'
  return 'Fail (Does not meet WCAG standards)'
}

// Get overall rating CSS class
const getOverallRatingClass = () => {
  if (!contrastResult.value) return 'alert-secondary'
  
  const { normalAAA, normalAA, largeAAA, largeAA } = contrastResult.value
  
  if (normalAAA) return 'alert-success'
  if (normalAA) return 'alert-info'
  if (largeAAA) return 'alert-warning'
  if (largeAA) return 'alert-warning'
  return 'alert-danger'
}

// Initialize
onMounted(() => {
  calculateContrast()
})
</script>

<style scoped>
.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

.color-preview {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #dee2e6;
  margin: 0 auto;
}

.color-preview-large {
  min-height: 200px;
}

.form-control-color {
  width: 60px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
}

.preset-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #dee2e6;
}

.font-monospace {
  font-family: 'SF Mono', Monaco, 'Inconsolata', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
}
</style>