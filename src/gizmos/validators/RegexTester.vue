<script setup>
import { ref, computed, watch } from 'vue'

const pattern = ref('^(?<user>\\w+)@(\\w+).([a-z]{2,3})$')
const flagsArray = ref(['g', 'm']) // default: global & multiline
const flagsOptions = [
  { value: 'g', label: 'g (global)' },
  { value: 'i', label: 'i (ignore case)' },
  { value: 'm', label: 'm (multiline ^$)' },
  { value: 'u', label: 'u (unicode)' },
  { value: 'y', label: 'y (sticky)' },
  { value: 's', label: 's (dotAll)' }
]
const testString = ref(`mert@example.com
foo@bar.net
HELLO@EXAMPLE.COM`)
const matchResults = ref([])
const error = ref('')

// Flags birleşik string olarak
const flags = computed(() => flagsArray.value.join(''))

function testRegex() {
  try {
    error.value = ''
    matchResults.value = []
    if (!pattern.value) {
      error.value = 'Please enter a regex pattern.'
      return
    }
    
    const regex = new RegExp(pattern.value, flags.value)
    const matches = []
    let m
    
    if (flags.value.includes('g')) {
      while ((m = regex.exec(testString.value)) !== null) {
        matches.push({
          match: m[0],
          index: m.index,
          groups: m.groups
        })
        // Avoid infinite loops on zero-width matches
        if (m.index === regex.lastIndex) regex.lastIndex++
      }
    } else {
      m = regex.exec(testString.value)
      if (m) {
        matches.push({
          match: m[0],
          index: m.index,
          groups: m.groups
        })
      }
    }
    matchResults.value = matches
    if (matches.length === 0) {
      error.value = 'No matches found.'
    }
  } catch (e) {
    error.value = 'Invalid regular expression: ' + e.message
    matchResults.value = []
  }
}

// Pattern, flags veya test string değişince otomatik test
watch([pattern, flagsArray, testString], testRegex, { immediate: true })
</script>

<template>
  <div class="container-fluid my-4">
    <h2 class="mb-3">Regex Tester</h2>
    <p>
      Enter a JavaScript regular expression and test it against a target string.<br>
      Flags and multiline patterns are supported. Named groups will be shown if present.
    </p>
    <form @submit.prevent>
      <div class="row align-items-end mb-3">
        <div class="col-md-7 mb-2">
          <label class="form-label">Pattern</label>
          <textarea v-model="pattern" class="form-control font-monospace" rows="3" spellcheck="false" style="resize:vertical" />
        </div>
        <div class="col-md-3 mb-2">
          <label class="form-label">Flags</label>
          <select v-model="flagsArray" class="form-select" multiple style="min-height: 120px;">
            <option v-for="opt in flagsOptions" :value="opt.value" :key="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
        <div class="col-md-2 mb-2 d-flex align-items-end">
          <div>
            <span class="badge bg-secondary font-monospace">/{pattern}/{{ flags }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Test String</label>
        <textarea v-model="testString" class="form-control font-monospace" rows="4" spellcheck="false" style="resize:vertical" />
      </div>
    </form>
    <div v-if="error" class="alert alert-warning mt-3">{{ error }}</div>
    <div v-else-if="matchResults.length > 0" class="mt-3">
      <h5>Matches:</h5>
      <ul class="list-group mb-2">
        <li v-for="(res, i) in matchResults" :key="i" class="list-group-item">
          <strong>#{{ i+1 }}: </strong>
          <span class="badge bg-success me-2">"{{ res.match }}"</span> at index <b>{{ res.index }}</b>
          <span v-if="res.groups && Object.keys(res.groups || {}).length">
            <br /><b>Groups: </b>
            <span v-for="(val, k) in res.groups" :key="k">
              <span class="badge bg-secondary me-1">{{ k }}: {{ val }}</span>
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>