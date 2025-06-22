<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('toAscii') // 'toAscii' or 'toUnicode'
const outputFormat = ref('decimal') // 'decimal', 'hex', 'octal', 'binary', 'unicode'

function convert() {
    if (mode.value === 'toAscii') {
        output.value = input.value
            .split('')
            .map(char => {
                const code = char.charCodeAt(0)
                switch (outputFormat.value) {
                    case 'hex': return '0x' + code.toString(16).padStart(2, '0')
                    case 'octal': return '0o' + code.toString(8)
                    case 'binary': return '0b' + code.toString(2)
                    case 'unicode': return '\\u' + code.toString(16).padStart(4, '0')
                    default: return code.toString(10)
                }
            })
            .join(' ')
    } else if (mode.value === 'toUnicode') {
        let str = input.value.trim()
        if (!str) {
            output.value = ''
            return
        }
        const chars = str
            .split(/[\s,]+/)
            .map(token => {
                if (/^\\u[0-9a-fA-F]{4}$/.test(token)) {
                    return String.fromCharCode(parseInt(token.slice(2), 16))
                } else if (/^0x[0-9a-fA-F]+$/.test(token)) {
                    return String.fromCharCode(parseInt(token, 16))
                } else if (/^0o[0-7]+$/.test(token)) {
                    return String.fromCharCode(parseInt(token.slice(2), 8))
                } else if (/^0b[01]+$/.test(token)) {
                    return String.fromCharCode(parseInt(token.slice(2), 2))
                } else if (/^\d+$/.test(token)) {
                    return String.fromCharCode(Number(token))
                } else {
                    return ''
                }
            })
        output.value = chars.join('')
    }
}

function copyOutput() {
    if (output.value) {
        navigator.clipboard.writeText(output.value)
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = function(evt) {
        input.value = evt.target.result
    }
    reader.readAsText(file)
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>ASCII/Unicode Converter</h1>
                <span>
                    You can use the ASCII - Unicode Converter Gizmo to convert text to ASCII or Unicode format, and vice versa.
                </span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <label class="form-label">Conversion Mode</label>
                    <select class="form-select" v-model="mode">
                        <option value="toAscii">Text → Code Points</option>
                        <option value="toUnicode">Code Points → Text</option>
                    </select>
                </div>
                <div class="mb-3" v-if="mode === 'toAscii'">
                    <label class="form-label">Output Format</label>
                    <select class="form-select" v-model="outputFormat">
                        <option value="decimal">Decimal</option>
                        <option value="hex">Hexadecimal (0x...)</option>
                        <option value="octal">Octal (0o...)</option>
                        <option value="binary">Binary (0b...)</option>
                        <option value="unicode">Unicode (\\uXXXX)</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="inputText" class="form-label">
                        {{ mode === 'toAscii' ? 'Input Text' : 'Input Code Points' }}
                    </label>
                    <textarea
                        id="inputText"
                        class="form-control"
                        rows="5"
                        v-model="input"
                        placeholder="Type your text or code points here"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <input type="file" class="form-control" accept=".txt" @change="handleFileUpload" />
                </div>
                <button class="btn btn-primary" @click="convert">Convert</button>
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
                <div class="mb-2 fw-semibold d-flex align-items-center">
                    Result
                    <button class="btn btn-outline-secondary btn-sm ms-auto" @click="copyOutput" :disabled="!output">
                        Copy
                    </button>
                </div>
                <textarea
                    class="form-control"
                    rows="5"
                    readonly
                    :value="output"
                ></textarea>
            </div>
        </div>
    </div>
</template>