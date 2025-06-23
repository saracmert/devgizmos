<script setup>
import { ref } from 'vue'
import { useBase64, useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const encodeInput = ref('')
const encodeOutput = ref('')
const decodeInput = ref('')
const decodeOutput = ref('')
const file = ref()

const { copy } = useClipboard({ encodeOutput })
const { base64: fileBase64 } = useBase64(file)

function encode () {
    encodeOutput.value = btoa(encodeInput.value);
}

function decode () {
    decodeOutput.value = atob(decodeInput.value);
}

function onFileInput(e) {
  file.value = e.target.files[0]
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('Base64') }}</h1>
                <span>{{ getGizmoDescription('Base64') }}</span>
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-12">
                <div class="accordion" id="accordion-text">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingEncode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-encode" aria-expanded="false" aria-controls="flush-encode">
                            {{ t('base64.encodeText') }}
                        </button>
                        </h2>
                        <div id="flush-encode" class="accordion-collapse collapse" aria-labelledby="flush-headingEncode" data-bs-parent="#accordion">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtEncodeInput" class="form-label">{{ t('base64.textInput') }}</label>
                                        <textarea v-model="encodeInput" class="form-control" id="txtEncodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="encode()">{{ t('base64.encode') }}</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtEncodeOutput" class="form-label">{{ t('base64.textOutput') }}</label>
                                        <textarea v-model="encodeOutput" class="form-control" id="txtEncodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(encodeOutput)">{{ t('base64.copy') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingDecode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-decode" aria-expanded="false" aria-controls="flush-decode">
                            {{ t('base64.decodeText') }}
                        </button>
                        </h2>
                        <div id="flush-decode" class="accordion-collapse collapse" aria-labelledby="flush-headingDecode" data-bs-parent="#accordion">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtDecodeInput" class="form-label">{{ t('base64.textInput') }}</label>
                                        <textarea v-model="decodeInput" class="form-control" id="txtDecodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="decode()">{{ t('base64.decode') }}</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtDecodeOutput" class="form-label">{{ t('base64.textOutput') }}</label>
                                        <textarea v-model="decodeOutput" class="form-control" id="txtDecodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(decodeOutput)">{{ t('base64.copy') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-5">
                <div class="accordion" id="accordion-file">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingEncode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-encodeFile" aria-expanded="false" aria-controls="flush-encodeFile">
                            {{ t('base64.encodeFile') }}
                        </button>
                        </h2>
                        <div id="flush-encodeFile" class="accordion-collapse collapse" aria-labelledby="flush-headingEncode" data-bs-parent="#accordion">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtEncodeFileInput" class="form-label">{{ t('base64.fileInput') }}</label>
                                        <input class="form-control" id="txtEncodeFileInput" type="file" @input="onFileInput">
                                    </div>
                                    <div class="mb-3">
                                        <label for="txtEncodeFileOutput" class="form-label">{{ t('base64.textOutput') }}</label>
                                        <textarea :value="fileBase64" class="form-control" id="txtEncodeFileOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(fileBase64)">{{ t('base64.copy') }}</button>
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