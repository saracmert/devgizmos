<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("roman_numeral.title") }}</h4>
            <p class="card-subtitle">{{ $t("roman_numeral.description") }}</p>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Number to Roman -->
              <div class="col-md-6">
                <div class="card border-primary">
                  <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">{{ $t("roman_numeral.number_to_roman") }}</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="numberInput" class="form-label">{{ $t("roman_numeral.enter_number") }}</label>
                      <input 
                        id="numberInput"
                        v-model="numberInput" 
                        type="number" 
                        class="form-control"
                        :placeholder="$t('roman_numeral.number_placeholder')"
                        min="1"
                        max="3999"
                        @input="convertNumberToRoman"
                      >
                      <div class="form-text">{{ $t("roman_numeral.number_range") }}</div>
                    </div>

                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <button 
                        v-for="example in numberExamples" 
                        :key="example"
                        class="btn btn-sm btn-outline-primary"
                        @click="setNumberExample(example)"
                      >
                        {{ example }}
                      </button>
                    </div>

                    <div v-if="romanResult" class="alert alert-success">
                      <h6>{{ $t("roman_numeral.roman_numeral") }}:</h6>
                      <div class="d-flex justify-content-between align-items-center">
                        <code class="fs-4">{{ romanResult }}</code>
                        <button 
                          class="btn btn-sm btn-outline-success"
                          @click="copyToClipboard(romanResult)"
                          :title="$t('generic.copy')"
                        >
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                    </div>

                    <div v-if="numberError" class="alert alert-danger">
                      {{ numberError }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Roman to Number -->
              <div class="col-md-6">
                <div class="card border-success">
                  <div class="card-header bg-success text-white">
                    <h5 class="mb-0">{{ $t("roman_numeral.roman_to_number") }}</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="romanInput" class="form-label">{{ $t("roman_numeral.enter_roman") }}</label>
                      <input 
                        id="romanInput"
                        v-model="romanInput" 
                        type="text" 
                        class="form-control text-uppercase"
                        :placeholder="$t('roman_numeral.roman_placeholder')"
                        @input="convertRomanToNumber"
                        style="text-transform: uppercase"
                      >
                      <div class="form-text">{{ $t("roman_numeral.valid_characters") }}</div>
                    </div>

                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <button 
                        v-for="example in romanExamples" 
                        :key="example"
                        class="btn btn-sm btn-outline-success"
                        @click="setRomanExample(example)"
                      >
                        {{ example }}
                      </button>
                    </div>

                    <div v-if="numberResult" class="alert alert-success">
                      <h6>{{ $t("roman_numeral.decimal_number") }}:</h6>
                      <div class="d-flex justify-content-between align-items-center">
                        <code class="fs-4">{{ numberResult.toLocaleString() }}</code>
                        <button 
                          class="btn btn-sm btn-outline-success"
                          @click="copyToClipboard(numberResult.toString())"
                          :title="$t('generic.copy')"
                        >
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                    </div>

                    <div v-if="romanError" class="alert alert-danger">
                      {{ romanError }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Roman Numerals Reference -->
            <div class="mt-4">
              <div class="accordion" id="romanInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="romanInfoHeading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#romanInfoCollapse">
                      {{ $t("roman_numeral.reference_guide") }}
                    </button>
                  </h2>
                  <div id="romanInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#romanInfoAccordion">
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-6">
                          <h6>{{ $t("roman_numeral.basic_symbols") }}:</h6>
                          <table class="table table-sm">
                            <tbody>
                              <tr><td><strong>I</strong></td><td>1</td></tr>
                              <tr><td><strong>V</strong></td><td>5</td></tr>
                              <tr><td><strong>X</strong></td><td>10</td></tr>
                              <tr><td><strong>L</strong></td><td>50</td></tr>
                              <tr><td><strong>C</strong></td><td>100</td></tr>
                              <tr><td><strong>D</strong></td><td>500</td></tr>
                              <tr><td><strong>M</strong></td><td>1000</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col-md-6">
                          <h6>{{ $t("roman_numeral.subtraction_rules") }}:</h6>
                          <table class="table table-sm">
                            <tbody>
                              <tr><td><strong>IV</strong></td><td>4 (5-1)</td></tr>
                              <tr><td><strong>IX</strong></td><td>9 (10-1)</td></tr>
                              <tr><td><strong>XL</strong></td><td>40 (50-10)</td></tr>
                              <tr><td><strong>XC</strong></td><td>90 (100-10)</td></tr>
                              <tr><td><strong>CD</strong></td><td>400 (500-100)</td></tr>
                              <tr><td><strong>CM</strong></td><td>900 (1000-100)</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="mt-3">
                        <h6>{{ $t("roman_numeral.rules") }}:</h6>
                        <ul>
                          <li>{{ $t("roman_numeral.rule_1") }}</li>
                          <li>{{ $t("roman_numeral.rule_2") }}</li>
                          <li>{{ $t("roman_numeral.rule_3") }}</li>
                          <li>{{ $t("roman_numeral.rule_4") }}</li>
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
const numberInput = ref('')
const romanInput = ref('')
const romanResult = ref('')
const numberResult = ref(null)
const numberError = ref('')
const romanError = ref('')

// Examples
const numberExamples = [1, 4, 9, 42, 99, 500, 1000, 1994, 2023, 3999]
const romanExamples = ['I', 'IV', 'IX', 'XLII', 'XCIX', 'D', 'M', 'MCMXCIV', 'MMXXIII', 'MMMCMXCIX']

// Roman numeral values
const romanValues = [
  { numeral: 'M', value: 1000 },
  { numeral: 'CM', value: 900 },
  { numeral: 'D', value: 500 },
  { numeral: 'CD', value: 400 },
  { numeral: 'C', value: 100 },
  { numeral: 'XC', value: 90 },
  { numeral: 'L', value: 50 },
  { numeral: 'XL', value: 40 },
  { numeral: 'X', value: 10 },
  { numeral: 'IX', value: 9 },
  { numeral: 'V', value: 5 },
  { numeral: 'IV', value: 4 },
  { numeral: 'I', value: 1 }
]

// Convert number to Roman numeral
const numberToRoman = (num) => {
  if (num <= 0 || num > 3999) {
    throw new Error('Number must be between 1 and 3999')
  }
  
  let result = ''
  let remaining = num
  
  for (const { numeral, value } of romanValues) {
    const count = Math.floor(remaining / value)
    if (count > 0) {
      result += numeral.repeat(count)
      remaining -= value * count
    }
  }
  
  return result
}

// Convert Roman numeral to number
const romanToNumber = (roman) => {
  const cleanRoman = roman.trim().toUpperCase()
  
  // Validate Roman numeral format
  if (!/^[IVXLCDM]+$/.test(cleanRoman)) {
    throw new Error('Invalid Roman numeral characters')
  }
  
  let result = 0
  let i = 0
  
  for (const { numeral, value } of romanValues) {
    while (cleanRoman.substr(i, numeral.length) === numeral) {
      result += value
      i += numeral.length
    }
  }
  
  // Validate that conversion back gives the same result
  const backConverted = numberToRoman(result)
  if (backConverted !== cleanRoman) {
    throw new Error('Invalid Roman numeral format')
  }
  
  return result
}

// Convert number to Roman
const convertNumberToRoman = () => {
  numberError.value = ''
  romanResult.value = ''
  
  if (!numberInput.value) return
  
  try {
    const num = parseInt(numberInput.value)
    if (isNaN(num)) {
      throw new Error('Please enter a valid number')
    }
    
    romanResult.value = numberToRoman(num)
  } catch (error) {
    numberError.value = error.message
  }
}

// Convert Roman to number
const convertRomanToNumber = () => {
  romanError.value = ''
  numberResult.value = null
  
  if (!romanInput.value.trim()) return
  
  try {
    numberResult.value = romanToNumber(romanInput.value)
  } catch (error) {
    romanError.value = error.message
  }
}

// Set number example
const setNumberExample = (example) => {
  numberInput.value = example.toString()
  convertNumberToRoman()
}

// Set Roman example
const setRomanExample = (example) => {
  romanInput.value = example
  convertRomanToNumber()
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

.table td {
  padding: 0.25rem 0.5rem;
}
</style>