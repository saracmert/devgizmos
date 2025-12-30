<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("color_palette_generator.title") }}</h4>
            <p class="card-subtitle">{{ $t("color_palette_generator.description") }}</p>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Generator Controls -->
              <div class="col-lg-3">
                <div class="card">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_palette_generator.generator_settings") }}</h6>
                  </div>
                  <div class="card-body">
                    <!-- Base Color -->
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.base_color") }}</label>
                      <div class="d-flex align-items-center">
                        <input 
                          v-model="baseColor" 
                          type="color" 
                          class="form-control form-control-color me-2"
                          @change="generatePalette"
                        >
                        <input 
                          v-model="baseColor" 
                          type="text" 
                          class="form-control font-monospace"
                          :placeholder="$t('color_palette_generator.hex_placeholder')"
                          @input="generatePalette"
                        >
                      </div>
                    </div>

                    <!-- Palette Type -->
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.palette_type") }}</label>
                      <select v-model="paletteType" class="form-select" @change="generatePalette">
                        <option value="monochromatic">{{ $t("color_palette_generator.monochromatic") }}</option>
                        <option value="analogous">{{ $t("color_palette_generator.analogous") }}</option>
                        <option value="complementary">{{ $t("color_palette_generator.complementary") }}</option>
                        <option value="triadic">{{ $t("color_palette_generator.triadic") }}</option>
                        <option value="tetradic">{{ $t("color_palette_generator.tetradic") }}</option>
                        <option value="split_complementary">{{ $t("color_palette_generator.split_complementary") }}</option>
                        <option value="double_complementary">{{ $t("color_palette_generator.double_complementary") }}</option>
                        <option value="random">{{ $t("color_palette_generator.random") }}</option>
                      </select>
                    </div>

                    <!-- Color Count -->
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.color_count") }} ({{ colorCount }})</label>
                      <input 
                        v-model.number="colorCount" 
                        type="range" 
                        class="form-range" 
                        min="3" 
                        max="12"
                        @input="generatePalette"
                      >
                    </div>

                    <!-- Brightness -->
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.brightness") }} ({{ brightness }}%)</label>
                      <input 
                        v-model.number="brightness" 
                        type="range" 
                        class="form-range" 
                        min="10" 
                        max="100"
                        @input="generatePalette"
                      >
                    </div>

                    <!-- Saturation -->
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.saturation") }} ({{ saturation }}%)</label>
                      <input 
                        v-model.number="saturation" 
                        type="range" 
                        class="form-range" 
                        min="10" 
                        max="100"
                        @input="generatePalette"
                      >
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-grid gap-2">
                      <button class="btn btn-primary" @click="generatePalette">
                        {{ $t("color_palette_generator.generate_new") }}
                      </button>
                      <button class="btn btn-success" @click="randomizeAll">
                        {{ $t("color_palette_generator.randomize_all") }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Quick Presets -->
                <div class="card mt-3">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_palette_generator.quick_presets") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="d-grid gap-2">
                      <button 
                        v-for="preset in colorPresets" 
                        :key="preset.name"
                        class="btn btn-outline-secondary btn-sm"
                        @click="applyPreset(preset)"
                      >
                        {{ preset.name }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Generated Palette -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">{{ $t("color_palette_generator.generated_palette") }}</h6>
                    <div>
                      <button class="btn btn-outline-primary btn-sm me-2" @click="copyPaletteAsCSS">
                        {{ $t("color_palette_generator.copy_css") }}
                      </button>
                      <button class="btn btn-outline-secondary btn-sm me-2" @click="copyPaletteAsJSON">
                        {{ $t("color_palette_generator.copy_json") }}
                      </button>
                      <button class="btn btn-outline-success btn-sm" @click="downloadPalette">
                        {{ $t("color_palette_generator.download_palette") }}
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row g-3">
                      <div 
                        v-for="(color, index) in palette" 
                        :key="index"
                        class="col-md-4"
                      >
                        <div class="color-card">
                          <div 
                            class="color-swatch" 
                            :style="{ backgroundColor: color.hex }"
                            @click="copyToClipboard(color.hex)"
                          ></div>
                          <div class="color-info p-2">
                            <div class="color-values">
                              <div class="small"><strong>HEX:</strong> {{ color.hex }}</div>
                              <div class="small"><strong>RGB:</strong> {{ color.rgb }}</div>
                              <div class="small"><strong>HSL:</strong> {{ color.hsl }}</div>
                            </div>
                            <div class="mt-2">
                              <button 
                                class="btn btn-sm btn-outline-primary me-1"
                                @click="copyToClipboard(color.hex)"
                                :title="$t('color_palette_generator.copy_color')"
                              >
                                📋
                              </button>
                              <button 
                                class="btn btn-sm btn-outline-warning"
                                @click="setAsBase(color.hex)"
                                :title="$t('color_palette_generator.set_as_base')"
                              >
                                ⭐
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Palette Preview -->
                <div class="card mt-3">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_palette_generator.palette_preview") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="palette-preview">
                      <div 
                        v-for="(color, index) in palette" 
                        :key="index"
                        class="palette-stripe"
                        :style="{ backgroundColor: color.hex }"
                      ></div>
                    </div>
                    
                    <!-- Website Preview -->
                    <div class="website-preview mt-3 p-3 rounded border" :style="{ backgroundColor: palette[0]?.hex || '#ffffff' }">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0" :style="{ color: palette[1]?.hex || '#000000' }">
                          {{ $t("color_palette_generator.website_title") }}
                        </h5>
                        <nav>
                          <a href="#" class="me-3" :style="{ color: palette[2]?.hex || '#333333' }">Home</a>
                          <a href="#" class="me-3" :style="{ color: palette[2]?.hex || '#333333' }">About</a>
                          <a href="#" :style="{ color: palette[2]?.hex || '#333333' }">Contact</a>
                        </nav>
                      </div>
                      <p :style="{ color: palette[3]?.hex || '#666666' }">
                        {{ $t("color_palette_generator.website_content") }}
                      </p>
                      <button 
                        class="btn btn-sm"
                        :style="{ 
                          backgroundColor: palette[4]?.hex || '#007bff',
                          color: palette[0]?.hex || '#ffffff',
                          borderColor: palette[4]?.hex || '#007bff'
                        }"
                      >
                        {{ $t("color_palette_generator.website_button") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contrast Checker Integration -->
              <div class="col-lg-3">
                <div class="card">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("color_palette_generator.contrast_checker") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.foreground") }}</label>
                      <select v-model="contrastForeground" class="form-select" @change="checkContrast">
                        <option v-for="(color, index) in palette" :key="index" :value="color.hex">
                          {{ color.hex }}
                        </option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label class="form-label">{{ $t("color_palette_generator.background") }}</label>
                      <select v-model="contrastBackground" class="form-select" @change="checkContrast">
                        <option v-for="(color, index) in palette" :key="index" :value="color.hex">
                          {{ color.hex }}
                        </option>
                      </select>
                    </div>

                    <!-- Contrast Preview -->
                    <div 
                      v-if="contrastForeground && contrastBackground"
                      class="contrast-preview p-3 rounded mb-3 text-center"
                      :style="{ 
                        backgroundColor: contrastBackground,
                        color: contrastForeground,
                        border: '1px solid #dee2e6'
                      }"
                    >
                      <div>{{ $t("color_palette_generator.sample_text") }}</div>
                      <small>{{ $t("color_palette_generator.small_text") }}</small>
                    </div>

                    <!-- Contrast Results -->
                    <div v-if="contrastResult" class="contrast-results">
                      <div class="text-center mb-2">
                        <strong>{{ contrastResult.ratio.toFixed(2) }}:1</strong>
                      </div>
                      <div class="row g-1 text-center">
                        <div class="col-6">
                          <span 
                            class="badge"
                            :class="contrastResult.normalAA ? 'bg-success' : 'bg-danger'"
                          >
                            AA {{ contrastResult.normalAA ? '✓' : '✗' }}
                          </span>
                        </div>
                        <div class="col-6">
                          <span 
                            class="badge"
                            :class="contrastResult.normalAAA ? 'bg-success' : 'bg-warning'"
                          >
                            AAA {{ contrastResult.normalAAA ? '✓' : '✗' }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- All Combinations -->
                    <div class="mt-3">
                      <button 
                        class="btn btn-outline-info btn-sm w-100"
                        @click="checkAllCombinations"
                      >
                        {{ $t("color_palette_generator.check_all_combinations") }}
                      </button>
                    </div>

                    <!-- Best Combinations -->
                    <div v-if="bestCombinations.length > 0" class="mt-3">
                      <h6 class="small">{{ $t("color_palette_generator.best_combinations") }}</h6>
                      <div v-for="combo in bestCombinations" :key="`${combo.fg}-${combo.bg}`" class="small mb-1">
                        <div 
                          class="d-flex align-items-center p-2 rounded"
                          :style="{ backgroundColor: combo.bg, color: combo.fg }"
                        >
                          <span class="flex-grow-1">{{ combo.ratio.toFixed(1) }}:1</span>
                          <span class="badge badge-sm bg-success">{{ combo.level }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive state
const baseColor = ref('#3498db')
const paletteType = ref('monochromatic')
const colorCount = ref(5)
const brightness = ref(70)
const saturation = ref(80)
const palette = ref([])
const contrastForeground = ref('')
const contrastBackground = ref('')
const contrastResult = ref(null)
const bestCombinations = ref([])

// Color presets
const colorPresets = [
  { name: 'Ocean Blue', baseColor: '#0077be', type: 'analogous' },
  { name: 'Sunset Orange', baseColor: '#ff6b35', type: 'complementary' },
  { name: 'Forest Green', baseColor: '#2d5016', type: 'monochromatic' },
  { name: 'Purple Vibes', baseColor: '#8e44ad', type: 'triadic' },
  { name: 'Coral Reef', baseColor: '#ff7f7f', type: 'analogous' },
  { name: 'Tech Gray', baseColor: '#34495e', type: 'monochromatic' },
  { name: 'Golden Hour', baseColor: '#f39c12', type: 'split_complementary' },
  { name: 'Deep Sea', baseColor: '#2c3e50', type: 'tetradic' }
]

// Color utility functions
const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

const hslToHex = (h, s, l) => {
  h = h % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2

  let r, g, b

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Generate different palette types
const generatePalette = () => {
  const [h, s, l] = hexToHsl(baseColor.value)
  const colors = []

  switch (paletteType.value) {
    case 'monochromatic':
      colors.push(...generateMonochromatic(h, s, l))
      break
    case 'analogous':
      colors.push(...generateAnalogous(h, s, l))
      break
    case 'complementary':
      colors.push(...generateComplementary(h, s, l))
      break
    case 'triadic':
      colors.push(...generateTriadic(h, s, l))
      break
    case 'tetradic':
      colors.push(...generateTetradic(h, s, l))
      break
    case 'split_complementary':
      colors.push(...generateSplitComplementary(h, s, l))
      break
    case 'double_complementary':
      colors.push(...generateDoubleComplementary(h, s, l))
      break
    case 'random':
      colors.push(...generateRandom())
      break
  }

  palette.value = colors.slice(0, colorCount.value).map(color => {
    const rgb = hexToRgb(color)
    const [ch, cs, cl] = hexToHsl(color)
    return {
      hex: color,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${Math.round(ch)}, ${Math.round(cs)}%, ${Math.round(cl)}%)`
    }
  })

  // Auto-set contrast colors if palette is available
  if (palette.value.length >= 2) {
    contrastForeground.value = palette.value[0].hex
    contrastBackground.value = palette.value[1].hex
    checkContrast()
  }
}

const generateMonochromatic = (h, s, l) => {
  const colors = []
  const baseLightness = l * brightness.value / 100
  const baseSaturation = s * saturation.value / 100

  for (let i = 0; i < colorCount.value; i++) {
    const lightness = Math.max(10, Math.min(90, baseLightness + (i - 2) * 20))
    colors.push(hslToHex(h, baseSaturation, lightness))
  }

  return colors
}

const generateAnalogous = (h, s, l) => {
  const colors = []
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  for (let i = 0; i < colorCount.value; i++) {
    const hue = (h + (i - 2) * 30 + 360) % 360
    colors.push(hslToHex(hue, baseSaturation, baseLightness))
  }

  return colors
}

const generateComplementary = (h, s, l) => {
  const colors = []
  const complementary = (h + 180) % 360
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  // Add variations of base and complementary colors
  for (let i = 0; i < Math.ceil(colorCount.value / 2); i++) {
    const lightness = Math.max(20, Math.min(80, baseLightness + i * 20))
    colors.push(hslToHex(h, baseSaturation, lightness))
    if (colors.length < colorCount.value) {
      colors.push(hslToHex(complementary, baseSaturation, lightness))
    }
  }

  return colors
}

const generateTriadic = (h, s, l) => {
  const colors = []
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  const hues = [h, (h + 120) % 360, (h + 240) % 360]
  
  for (let i = 0; i < colorCount.value; i++) {
    const hue = hues[i % 3]
    const lightness = Math.max(20, Math.min(80, baseLightness + Math.floor(i / 3) * 15))
    colors.push(hslToHex(hue, baseSaturation, lightness))
  }

  return colors
}

const generateTetradic = (h, s, l) => {
  const colors = []
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  const hues = [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360]
  
  for (let i = 0; i < colorCount.value; i++) {
    const hue = hues[i % 4]
    const lightness = Math.max(20, Math.min(80, baseLightness + Math.floor(i / 4) * 15))
    colors.push(hslToHex(hue, baseSaturation, lightness))
  }

  return colors
}

const generateSplitComplementary = (h, s, l) => {
  const colors = []
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  const hues = [h, (h + 150) % 360, (h + 210) % 360]
  
  for (let i = 0; i < colorCount.value; i++) {
    const hue = hues[i % 3]
    const lightness = Math.max(20, Math.min(80, baseLightness + Math.floor(i / 3) * 20))
    colors.push(hslToHex(hue, baseSaturation, lightness))
  }

  return colors
}

const generateDoubleComplementary = (h, s, l) => {
  const colors = []
  const baseSaturation = s * saturation.value / 100
  const baseLightness = l * brightness.value / 100

  const hues = [h, (h + 30) % 360, (h + 180) % 360, (h + 210) % 360]
  
  for (let i = 0; i < colorCount.value; i++) {
    const hue = hues[i % 4]
    const lightness = Math.max(20, Math.min(80, baseLightness + Math.floor(i / 4) * 15))
    colors.push(hslToHex(hue, baseSaturation, lightness))
  }

  return colors
}

const generateRandom = () => {
  const colors = []
  
  for (let i = 0; i < colorCount.value; i++) {
    const h = Math.random() * 360
    const s = Math.random() * (saturation.value - 30) + 30
    const l = Math.random() * (brightness.value - 20) + 20
    colors.push(hslToHex(h, s, l))
  }

  return colors
}

// Contrast checking functions
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

const checkContrast = () => {
  if (!contrastForeground.value || !contrastBackground.value) return
  
  const ratio = getContrastRatio(contrastForeground.value, contrastBackground.value)
  
  contrastResult.value = {
    ratio,
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  }
}

const checkAllCombinations = () => {
  const combinations = []
  
  palette.value.forEach((fg, i) => {
    palette.value.forEach((bg, j) => {
      if (i !== j) {
        const ratio = getContrastRatio(fg.hex, bg.hex)
        let level = ''
        
        if (ratio >= 7) level = 'AAA'
        else if (ratio >= 4.5) level = 'AA'
        else if (ratio >= 3) level = 'AA Large'
        
        if (level) {
          combinations.push({
            fg: fg.hex,
            bg: bg.hex,
            ratio,
            level
          })
        }
      }
    })
  })
  
  bestCombinations.value = combinations
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 5)
}

// Utility functions
const randomizeAll = () => {
  baseColor.value = hslToHex(Math.random() * 360, 60 + Math.random() * 40, 40 + Math.random() * 40)
  paletteType.value = ['monochromatic', 'analogous', 'complementary', 'triadic', 'tetradic', 'split_complementary', 'random'][Math.floor(Math.random() * 7)]
  colorCount.value = 3 + Math.floor(Math.random() * 7)
  brightness.value = 40 + Math.random() * 50
  saturation.value = 50 + Math.random() * 40
  generatePalette()
}

const applyPreset = (preset) => {
  baseColor.value = preset.baseColor
  paletteType.value = preset.type
  generatePalette()
}

const setAsBase = (color) => {
  baseColor.value = color
  generatePalette()
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // You can add a toast notification here
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyPaletteAsCSS = async () => {
  const css = `:root {
${palette.value.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
}

/* Usage examples */
${palette.value.map((color, index) => `.color-${index + 1} { color: ${color.hex}; }`).join('\n')}
${palette.value.map((color, index) => `.bg-color-${index + 1} { background-color: ${color.hex}; }`).join('\n')}`

  await copyToClipboard(css)
}

const copyPaletteAsJSON = async () => {
  const json = JSON.stringify({
    palette: palette.value,
    settings: {
      baseColor: baseColor.value,
      type: paletteType.value,
      count: colorCount.value,
      brightness: brightness.value,
      saturation: saturation.value
    }
  }, null, 2)

  await copyToClipboard(json)
}

const downloadPalette = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 800
  canvas.height = 200

  const colorWidth = canvas.width / palette.value.length

  palette.value.forEach((color, index) => {
    ctx.fillStyle = color.hex
    ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height)
    
    // Add color text
    ctx.fillStyle = getContrastRatio('#ffffff', color.hex) > getContrastRatio('#000000', color.hex) ? '#ffffff' : '#000000'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(color.hex, (index + 0.5) * colorWidth, canvas.height / 2 - 10)
    ctx.fillText(color.rgb, (index + 0.5) * colorWidth, canvas.height / 2 + 10)
    ctx.fillText(color.hsl, (index + 0.5) * colorWidth, canvas.height / 2 + 30)
  })

  // Download
  const link = document.createElement('a')
  link.download = 'color-palette.png'
  link.href = canvas.toDataURL()
  link.click()
}

// Initialize
onMounted(() => {
  generatePalette()
})
</script>

<style scoped>
.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

.color-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.color-swatch {
  height: 80px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.color-swatch:hover {
  opacity: 0.8;
}

.color-info {
  background: #f8f9fa;
}

.color-values .small {
  margin-bottom: 2px;
}

.form-control-color {
  width: 40px;
  height: 38px;
  padding: 0;
  border: 1px solid #ced4da;
  border-radius: 6px;
}

.palette-preview {
  display: flex;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dee2e6;
}

.palette-stripe {
  flex: 1;
}

.website-preview {
  font-size: 14px;
}

.contrast-preview {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contrast-results {
  font-size: 13px;
}

.font-monospace {
  font-family: 'SF Mono', Monaco, 'Inconsolata', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
}

.badge-sm {
  font-size: 0.7rem;
}
</style>