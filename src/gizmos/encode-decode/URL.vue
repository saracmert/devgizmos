<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const encodeInput = ref('')
const encodeOutput = ref('')
const decodeInput = ref('')
const decodeOutput = ref('')

const { copy } = useClipboard({ encodeOutput })

function encode () {
    encodeOutput.value = encodeURIComponent(encodeInput.value);
}

function decode () {
    decodeOutput.value = decodeURIComponent(decodeInput.value);
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>URL</h1>
                <span>You can use the URL Encoder / Decoder Gizmo to encode or decode URL strings.</span>
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-12">
                <div class="accordion" id="accordion-text">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingEncode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-encode" aria-expanded="false" aria-controls="flush-encode">
                            Encode URL
                        </button>
                        </h2>
                        <div id="flush-encode" class="accordion-collapse collapse" aria-labelledby="flush-headingEncode" data-bs-parent="#accordion">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtEncodeInput" class="form-label">Input</label>
                                        <textarea v-model="encodeInput" class="form-control" id="txtEncodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="encode()">Encode</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtEncodeOutput" class="form-label">Output</label>
                                        <textarea v-model="encodeOutput" class="form-control" id="txtEncodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(encodeOutput)">Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingDecode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-decode" aria-expanded="false" aria-controls="flush-decode">
                            Decode URL
                        </button>
                        </h2>
                        <div id="flush-decode" class="accordion-collapse collapse" aria-labelledby="flush-headingDecode" data-bs-parent="#accordion">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtDecodeInput" class="form-label">Input</label>
                                        <textarea v-model="decodeInput" class="form-control" id="txtDecodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="decode()">Decode</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtDecodeOutput" class="form-label">Output</label>
                                        <textarea v-model="decodeOutput" class="form-control" id="txtDecodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(decodeOutput)">Copy</button>
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