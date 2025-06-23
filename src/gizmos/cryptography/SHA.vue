<script setup>
import { ref } from 'vue'
import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const encodeInput = ref('')
const uppercase = ref()
const sha512Output = ref()
const sha384Output = ref()
const sha512_256Output = ref()
const sha512_224Output = ref()
const { copy } = useClipboard({ encodeInput })

function generate() {
    sha512Output.value = (uppercase.value ? sha512(encodeInput.value).toUpperCase() : sha512(encodeInput.value));
    sha384Output.value = (uppercase.value ? sha384(encodeInput.value).toUpperCase() : sha384(encodeInput.value));
    sha512_256Output.value = (uppercase.value ? sha512_256(encodeInput.value).toUpperCase() : sha512_256(encodeInput.value));
    sha512_224Output.value = (uppercase.value ? sha512_224(encodeInput.value).toUpperCase() : sha512_224(encodeInput.value));
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('SHA') }}</h1>
                <span>{{ getGizmoDescription('SHA') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-12">                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase">
                    <label class="form-check-label" for="cbUppercase">
                        {{ t('sha.uppercase') }}
                    </label>
                </div>
                <div class="mb-3">
                    <label for="txtInput" class="form-label">{{ t('sha.inputString') }}</label>
                    <textarea v-model="encodeInput" class="form-control" id="txtInput" rows="5"></textarea>
                </div>
                <button class="btn btn-primary" @click="generate()">{{ t('sha.generate') }}</button>
            </div>

            <div class="col-3 mt-3">
                <h2>{{ t('sha.sha512') }}</h2>
                <textarea v-model="sha512Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512Output)">{{ t('generic.copy') }}</button>
            </div>
            <div class="col-3 mt-3">
                <h2>{{ t('sha.sha384') }}</h2>
                <textarea v-model="sha384Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha384Output)">{{ t('generic.copy') }}</button>
            </div>
            <div class="col-3 mt-3">
                <h2>{{ t('sha.sha512_256') }}</h2>
                <textarea v-model="sha512_256Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512_256Output)">{{ t('generic.copy') }}</button>
            </div>
            <div class="col-3 mt-3">
                <h2>{{ t('sha.sha512_224') }}</h2>
                <textarea v-model="sha512_224Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512_224Output)">{{ t('generic.copy') }}</button>
            </div>
        </div>
    </div>
</template>