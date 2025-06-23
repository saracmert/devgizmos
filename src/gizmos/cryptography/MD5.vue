<script setup>
import { ref } from 'vue'
import { md5 } from 'js-md5'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const encodeInput = ref('')
const uppercase = ref()
const md5Output = ref()
const { copy } = useClipboard({ encodeInput })

function generate() {
    md5Output.value = (uppercase.value ? md5(encodeInput.value).toUpperCase() : md5(encodeInput.value));
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('MD5') }}</h1>
                <span>{{ getGizmoDescription('MD5') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-12">                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase">
                    <label class="form-check-label" for="cbUppercase">
                        {{ t('md5.uppercase') }}
                    </label>
                </div>
                <div class="mb-3">
                    <label for="txtInput" class="form-label">{{ t('md5.inputString') }}</label>
                    <textarea v-model="encodeInput" class="form-control" id="txtInput" rows="5"></textarea>
                </div>
                <button class="btn btn-primary" @click="generate()">{{ t('md5.generate') }}</button>
            </div>
            <div class="col-12 mt-3">
                <textarea v-model="md5Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(md5Output)">{{ t('generic.copy') }}</button>
            </div>
        </div>
    </div>
</template>