<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const sortOrder = ref('asc')
const reverseLines = ref(false)
const removeEmpty = ref(false)
const unique = ref(false)
const caseSensitive = ref(false)

function process() {
    let lines = input.value.split(/\r?\n/)

    if (removeEmpty.value) {
        lines = lines.filter(line => line.trim().length > 0)
    }

    if (!caseSensitive.value) {
        lines = lines.map(line => line)
    }

    if (unique.value) {
        const seen = new Set()
        lines = lines.filter(line => {
            const key = caseSensitive.value ? line : line.toLowerCase()
            if (!seen.has(key)) {
                seen.add(key)
                return true
            }
            return false
        })
    }

    if (sortOrder.value !== 'none') {
        lines.sort((a, b) => {
            if (!caseSensitive.value) {
                a = a.toLowerCase()
                b = b.toLowerCase()
            }
            if (a < b) return sortOrder.value === 'asc' ? -1 : 1
            if (a > b) return sortOrder.value === 'asc' ? 1 : -1
            return 0
        })
    }

    if (reverseLines.value) {
        lines.reverse()
    }

    output.value = lines.join('\n')
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Text Sorter & Reverser</h1>
                <span>
                    You can use the Text Sorter & Reverser Gizmo to sort, reverse, deduplicate, or clean up your text lines with flexible options.
                </span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <label for="inputText" class="form-label">Input Text</label>
                    <textarea
                        id="inputText"
                        class="form-control"
                        rows="8"
                        v-model="input"
                        placeholder="Paste or type your text here"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Sort Order</label>
                    <select class="form-select" v-model="sortOrder">
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                        <option value="none">No Sorting</option>
                    </select>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="reverseLines" v-model="reverseLines">
                        <label class="form-check-label" for="reverseLines">Reverse Lines</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="unique" v-model="unique">
                        <label class="form-check-label" for="unique">Remove Duplicates</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="removeEmpty" v-model="removeEmpty">
                        <label class="form-check-label" for="removeEmpty">Remove Empty Lines</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="caseSensitive" v-model="caseSensitive">
                        <label class="form-check-label" for="caseSensitive">Case Sensitive</label>
                    </div>
                </div>
                <button class="btn btn-primary" @click="process">Process</button>
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
                <div class="mb-2 fw-semibold">Result</div>
                <textarea
                    class="form-control"
                    rows="8"
                    readonly
                    :value="output"
                ></textarea>
            </div>
        </div>
    </div>
</template>