<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('line') // 'line' or 'word'
const caseSensitive = ref(false)
const trimLines = ref(true)
const sortResult = ref(false)
const outputSeparator = ref('newline')
const stats = ref({ inputCount: 0, uniqueCount: 0 })

function deduplicate() {
    let items = []
    if (mode.value === 'line') {
        items = input.value.split(/\r?\n/)
        if (trimLines.value) items = items.map(l => l.trim())
        items = items.filter(l => l.length > 0)
    } else {
        items = input.value.split(/\s+/).filter(w => w.length > 0)
    }

    stats.value.inputCount = items.length

    const seen = new Set()
    const uniques = []
    for (let item of items) {
        let key = caseSensitive.value ? item : item.toLowerCase()
        if (!seen.has(key)) {
            seen.add(key)
            uniques.push(item)
        }
    }

    if (sortResult.value) {
        uniques.sort((a, b) => (caseSensitive.value ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())))
    }

    stats.value.uniqueCount = uniques.length

    switch (outputSeparator.value) {
        case 'comma':
            output.value = uniques.join(', ')
            break
        case 'semicolon':
            output.value = uniques.join('; ')
            break
        case 'space':
            output.value = uniques.join(' ')
            break
        default:
            output.value = uniques.join('\n')
    }
}

function copyResult() {
    navigator.clipboard.writeText(output.value)
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Text Deduplicator</h1>
                <span>
                    You can use the Text Deduplicator Gizmo to remove duplicate lines or words from your text. Choose deduplication mode, case sensitivity, output format, and more.
                </span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <label for="dedupInput" class="form-label">Input Text</label>
                    <textarea
                        id="dedupInput"
                        class="form-control"
                        rows="8"
                        v-model="input"
                        placeholder="Paste or type your text here"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Deduplication Mode</label>
                    <select class="form-select" v-model="mode">
                        <option value="line">By Line</option>
                        <option value="word">By Word</option>
                    </select>
                </div>
                <div class="mb-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="caseSensitive" v-model="caseSensitive">
                        <label class="form-check-label" for="caseSensitive">Case Sensitive</label>
                    </div>
                    <div class="form-check form-switch" v-if="mode === 'line'">
                        <input class="form-check-input" type="checkbox" id="trimLines" v-model="trimLines">
                        <label class="form-check-label" for="trimLines">Trim Lines</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="sortResult" v-model="sortResult">
                        <label class="form-check-label" for="sortResult">Sort Result</label>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Output Separator</label>
                    <select class="form-select" v-model="outputSeparator">
                        <option value="newline">New Line</option>
                        <option value="comma">Comma (,)</option>
                        <option value="semicolon">Semicolon (;)</option>
                        <option value="space">Space</option>
                    </select>
                </div>
                <button class="btn btn-primary" @click="deduplicate">Deduplicate</button>
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
                <div class="mb-2 fw-semibold">Result</div>
                <textarea
                    class="form-control"
                    rows="8"
                    readonly
                    :value="output"
                ></textarea>
                <div class="d-flex align-items-center mt-2">
                    <button class="btn btn-outline-secondary btn-sm me-2" @click="copyResult" :disabled="!output">Copy Result</button>
                    <span class="text-muted small ms-auto">
                        {{ stats.uniqueCount }} unique / {{ stats.inputCount }} total
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>