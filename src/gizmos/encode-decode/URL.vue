<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

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
                <h1>{{ getGizmoTitle('URL') }}</h1>
                <span>{{ getGizmoDescription('URL') }}</span>
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-12">
                <div class="accordion" id="accordion-text">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingEncode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-encode" aria-expanded="false" aria-controls="flush-encode">
                            {{ t('url.encodeUrl') }}
                        </button>
                        </h2>
                        <div id="flush-encode" class="accordion-collapse collapse" aria-labelledby="flush-headingEncode" data-bs-parent="#accordion-text">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtEncodeInput" class="form-label">{{ t('url.input') }}</label>
                                        <textarea v-model="encodeInput" class="form-control" id="txtEncodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="encode()">{{ t('url.encode') }}</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtEncodeOutput" class="form-label">{{ t('url.output') }}</label>
                                        <textarea v-model="encodeOutput" class="form-control" id="txtEncodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(encodeOutput)">{{ t('url.copy') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingDecode">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-decode" aria-expanded="false" aria-controls="flush-decode">
                            {{ t('url.decodeUrl') }}
                        </button>
                        </h2>
                        <div id="flush-decode" class="accordion-collapse collapse" aria-labelledby="flush-headingDecode" data-bs-parent="#accordion-text">
                            <div class="accordion-body">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label for="txtDecodeInput" class="form-label">{{ t('url.input') }}</label>
                                        <textarea v-model="decodeInput" class="form-control" id="txtDecodeInput" rows="3" />
                                    </div>
                                    <button class="btn btn-primary" @click="decode()">{{ t('url.decode') }}</button>
                                    <div class="mt-3 mb-3">
                                        <label for="txtDecodeOutput" class="form-label">{{ t('url.output') }}</label>
                                        <textarea v-model="decodeOutput" class="form-control" id="txtDecodeOutput" rows="3" disabled />
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="copy(decodeOutput)">{{ t('url.copy') }}</button>
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